angular.module('storage.catalog.catalogformFactory', [])

    .factory('storage.catalog.catalogFormFactory', ['$uibModal', 'sampleGridFactory', '$state', '$stateParams', '$cbResource', 'storageGridFactory', '$cbGridBuilder', 'cbFormHelper',

        function ($modal, sampleGridFactory, $state, $stateParams, $cbResource, storageGridFactory, $cbGridBuilder, $cbFormHelper) {

            var catalogFormFactory = {

                openCatalogFormModal: function (catalog) {

                    if (sample && sample.id && sample.division && !sample.division.canEdit) {

                        swal({
                            title: "Sorry,",
                            text: "You do not have permission to edit this sample because you do not have edit permissions for Division "  + sample.division.path,
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        }, function() {});

                        return;

                    }

                    $modal.open({
                        templateUrl: 'sample/views/partials/sample-form-modal-tpl.html',
                        controller: 'sampleFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sample: function () {

                                return sample;

                            },

                            sampleTypes: function () {

                                return $cbResource.get('/storage/sample-type', {cPerPage:100});

                            },

                            storageContainers: function () {

                                return $cbResource.get('/storage/storage-container');

                            },

                            catalogGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('catalogGridFactory');

                            },

                            divisionGrid: function () {

                                var sampleTypeId = sample ? sample.sampleTypeId : null;
                                var storageContainerId = sample && sample.storageContainer ? sample.storageContainer.id : null;

                                return storageGridFactory.getDivisionMatchGrid(sampleTypeId, storageContainerId);

                            },

                            targetGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('targetGridFactory');

                            },

                            donorGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('donorGridFactory');

                            },

                            moleculeGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('moleculeGridFactory');

                            },

                            tagGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/sample-tag/sample/', 'tagGridFactory', sample, true)

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/project/sample/sample/', 'projectGridFactory', sample, true)

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

                openDeleteForm: function (sample, returnState) {

                    $cbFormHelper.openForm("delete", "Catalog", catalog.id, '/storage/catalog', returnState);

                },

                openRestoreForm: function (sample, returnState) {

                    $cbFormHelper.openForm("restore", "Catalog", catalog.id, '/storage/catalog', returnState);

                },

                openPurgeForm: function (sample, returnState) {

                    $cbFormHelper.openForm("purge", "Catalog", catalog.id, '/storage/catalog', returnState);

                },

                // openReceiveForm: function (sample) {

                //     $modal.open({
                //         templateUrl: 'sample/partials/sample-receive-tpl.html',
                //         controller: 'sampleReceiveController',
                //         windowClass: 'inmodal',
                //         keyboard: false,
                //         backdrop: 'static',
                //         size: 'lg',
                //         resolve: {

                //             sample: function () {

                //                 return sample;

                //             },

                //             divisionGrid: function () {

                //                 var sampleTypeId = sample ? sample.sampleType.id : null;
                //                 var storageContainerId = sample ? sample.storageContainer.id : null;

                //                 return storageGridFactory.getDivisionMatchGrid(sampleTypeId, storageContainerId);

                //             },

                //             callback: function () {

                //                 return function () {

                //                     $state.go($state.current, $stateParams, {reload:true});

                //                 };

                //             }

                //         }

                //     });

                // },

            };

            return sampleFormFactory;
        }

    ])
;
