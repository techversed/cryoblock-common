angular.module('storage.catalog.catalogFormFactory', [])

    .factory('catalogFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', 'catalogGridFactory', '$cbGridBuilder', 'cbFormHelper',

        function ($uibModal, $state, $stateParams, $cbResource, catalogGridFactory, $cbGridBuilder, $cbFormHelper) {

            var catalogFormFactory = {

                openFormModal: function (catalog) {

                    $uibModal.open({
                        templateUrl: 'common/storage/catalog/partials/catalog-form-modal-tpl.html',
                        controller: 'catalogFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            catalog: function () {

                                return catalog;

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

                openDeleteForm: function (catalog, returnState) {

                    $cbFormHelper.openForm("delete", "Catalog", catalog.id, '/storage/catalog', returnState);

                },

                openRestoreForm: function (catalog, returnState) {

                    $cbFormHelper.openForm("restore", "Catalog", catalog.id, '/storage/catalog', returnState);

                },

                openPurgeForm: function (catalog, returnState) {

                    $cbFormHelper.openForm("purge", "Catalog", catalog.id, '/storage/catalog', returnState);

                }

            };

            return catalogFormFactory;
        }

    ])
;
