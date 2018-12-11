angular.module('workingSet.workingSetFactory', [])

    .factory('workingSetFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', '$cbGridBuilder', 'toastr', 'cbFormHelper',

        function ($uibModal, $state, $stateParams, $cbResource, $cbGridBuilder, toastr, $cbFormHelper) {

            var workingSetFormFactory = {

                openFormModal: function (workingSet) {

                    $uibModal.open({
                        templateUrl: 'common/working-set/partials/working-set-modal-tpl.html',
                        controller: 'workingSetCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            workingSet: function () {

                                return workingSet;
                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };
                            }
                        }
                    });
                },

            };

            return workingSetFormFactory;
        }

    ])
;
