angular.module('storage.storageNavigationCtrl', [])

    .controller('storageNavigationCtrl', ['$scope', 'divisions', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q', 'storageFactory', 'storageDivisionManager',

        function ($scope, divisions, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q, storageFactory, storageDivisionManager) {

            $scope.sdm = storageDivisionManager;

            $scope.divisions = divisions;

            $scope.treeOptions = {

                accept: function(sourceNodeScope, destNodesScope, destIndex) {

                    var division = destNodesScope.item;
                    var sourceDivision = sourceNodeScope.item;

                    if (division === undefined) {
                        return false;
                    }

                    if (!division) {
                        return false;
                    }

                    if (!division.hasDimension) {
                        return true;
                    }

                    return false;
                },

                beforeDrop: function (event) {

                    return $scope.handleDropEvent(event);

                },

                beforeDrag: function (event) {

                    return event.$modelValue.canEdit;

                },

                toggle: function (unknown, targetNode) {

                    $scope.toggleItem(targetNode.$modelValue, targetNode);

                }

            };

            $scope.handleDropEvent = function (event) {

                var destNodesScope = event.dest.nodesScope;
                var sourceNodesScope = event.source.nodesScope;
                var sourceScope = event.source.nodeScope;

                // not really moving anywhere
                if (destNodesScope.$id === sourceNodesScope.$id && event.dest.index === event.source.index) {
                    return;
                }

                if (!event.dest.nodesScope.$parent.$modelValue.canEdit) {

                    swal({
                        title: "Sorry,",
                        text: "You do not have permission to edit " + event.dest.nodesScope.$parent.$modelValue.title,
                        type: "warning",
                        showCancelButton: false,
                        // confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    }, function() {});

                    return $q.reject();

                }

                return $uibModal.open({
                    templateUrl: 'common/storage/partials/division-move-confirm-tpl.html',
                    controller: 'storageDivisionMoveConfirmCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'md',
                    resolve: {

                        dropEvent: function () {

                            return event;

                        }

                    }

                }).result;

            };

            $scope.goToDivision = function (division) {
                $state.go('storage.division', {id:division.id});
            };

            $scope.opts = {
                equality: function (node1, node2) {
                    return node1.id === node2.id;
                }
            };

            $scope.edit = function (division) {
                storageFormFactory.openDivisionFormModal(division);
            };

            $scope.addDivision = function (parentDivision) {

                storageFormFactory.openDivisionFormModal({parent: {id: parentDivision.id}});

            };

            $scope.createParentDivision = function () {

                storageFormFactory.openDivisionFormModal();

            };

            $scope.toggleItem = function (division, itemScope) {

                if (division.initialized) {
                    return;
                }

                storageFactory.getDivisionChildren(division).then(function (result) {
                    division.initialized = true;
                    division['__children'] = result;
                    $scope.sdm.navigationInitialized = false;
                    if ($scope.sdm.navigationState == $scope.sdm.navigationStates[1]) {
                        setTimeout(function () {
                            $scope.sdm.expandToDivision();
                        }, 100)
                    }
                });

            };

            $scope.isInventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');

            $scope.$on('$destroy', function () {
                $scope.sdm.navigationState = $scope.sdm.navigationStates[0];
            });

        }

    ])
;
