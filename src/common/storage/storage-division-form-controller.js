angular.module('storage.storageDivisionFormCtrl', [])

    .controller('storageDivisionFormCtrl', ['$scope', 'division', 'sampleTypeGrids', 'storageContainerGrids', '$uibModalInstance', '$cbResource', 'toastr', 'callback', 'divisionEditorGrids', 'divisionViewerGrids', '$state', 'ownerGrid', 'sessionFactory', 'divisionGroupEditorGrids', 'divisionGroupViewerGrids', 'storageDivisionManager',

        function ($scope, division, sampleTypeGrids, storageContainerGrids, $modalInstance, $cbResource, toastr, callback, divisionEditorGrids, divisionViewerGrids, $state, ownerGrid, sessionFactory, divisionGroupEditorGrids, divisionGroupViewerGrids, storageDivisionManager) {

            $scope.errors = [];
            $scope.divisionForm = {};

            $scope.division = division ? angular.copy(division) : {
                allowAllSampleTypes: true,
                allowAllStorageContainers: true,
                hasDimension: true,
                isPublicEdit: false,
                isPublicView: true,
                parent:{id:1},
                owner: sessionFactory.getLoggedInUser()
            };

            $scope.sampleTypeGrids = sampleTypeGrids;
            $scope.storageContainerGrids = storageContainerGrids;
            $scope.divisionEditorGrids = divisionEditorGrids;
            $scope.divisionViewerGrids = divisionViewerGrids;
            $scope.divisionGroupViewerGrids = divisionGroupViewerGrids;
            $scope.divisionGroupEditorGrids = divisionGroupEditorGrids;
            $scope.ownerGrid = ownerGrid;

            $scope.oldPublicEditValue = $scope.division.isPublicEdit;
            $scope.oldPublicViewValue = $scope.division.isPublicView;

            if ($scope.division.parentId) {
                $scope.division.parent = {id: $scope.division.parentId};
            }

            $scope.acceptedHeights = [];
            for (var i = 1; i <= 20; i++) {
                $scope.acceptedHeights.push(i);
            }

            $scope.acceptedWidths = [];
            for (var i = 1; i <= 20; i++) {
                $scope.acceptedWidths.push(i);
            }

            $scope.close = function () {

                if ($scope.divisionForm.$pristine === false) {
                    console.log('not pristine');
                }

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                // Check if permissions have changed
                $scope.permissionsChanged = false;
                if ($scope.division.editors !== undefined || $scope.division.groupEditors !== undefined || $scope.division.viewers !== undefined || $scope.division.groupViewers !== undefined) {
                    $scope.permissionsChanged = true;
                }

                if ($scope.division.id !== undefined && ($scope.oldPublicViewValue !== $scope.division.isPublicView || $scope.oldPublicEditValue !== $scope.division.isPublicEdit)) {
                    $scope.permissionsChanged = true;
                }

                if ($scope.permissionsChanged) {

                    swal({
                        title: "Are you sure?",
                        text: "You are changing the permissions of this division. All children permissions within this division will be overridden.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    }, function() {
                        $scope.save();
                    });

                } else {

                    $scope.save();

                }

            }

            $scope.save = function () {

                var method = $scope.division.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/storage/division?id[EQ]=' + $scope.division.id
                    : '/storage/division'
                ;

                $cbResource[method](url, $scope.division).then(

                    function (response) {

                        toastr.info('Division ' + method + 'd successfully');
                        $scope.close();
                        storageDivisionManager.navigationState = storageDivisionManager.navigationStates[0];
                        callback();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            }

        }

    ])
;
