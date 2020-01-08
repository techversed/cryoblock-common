angular.module('storageContainer.storageContainerFormFactory', [])

    .factory('storageContainerFormFactory', ['$uibModal', '$state', '$stateParams', 'cbFormHelper',

        function ($uibModal, $state, $stateParams, $cbFormHelper) {

            var storageContainerFormFactory = {

                openFormModal: function (storageContainer) {

                    $uibModal.open({
                        templateUrl: 'common/storage/storage-container/partials/storage-container-form-modal-tpl.html',
                        controller: 'storageContainerFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            storageContainer: function () {

                                return storageContainer;

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

              openDeleteForm: function (storageContainer, returnState) {

                    $cbFormHelper.openForm("delete", "Storage Container", storageContainer.id, '/storage/storageContainer', returnState);

                },

                openRestoreForm: function (storageContainer, returnState) {

                    $cbFormHelper.openForm("restore", "Storage Container", storageContainer.id, '/storage/storage-container', returnState);

                },

                openPurgeForm: function (storageContainer, returnState) {

                    $cbFormHelper.openForm("purge", "Storage Container", storageContainer.id, '/storage/storage-container', returnState);

                }

            };

            return storageContainerFormFactory;
        }

    ])
;
