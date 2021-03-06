angular.module('storage.storageFormFactory', [])

    .factory('storageFormFactory', ['$uibModal', 'storageFactory', '$state', '$stateParams', '$cbGridBuilder', '$cbResource', 'cbFormHelper',

        function ($modal, storageFactory, $state, $stateParams, $cbGridBuilder, $cbResource, cbFormHelper) {

            var storageFormFactory = {

                openDivisionFormModal: function (division) {

                    $modal.open({
                        templateUrl: 'common/storage/partials/storage-division-form-tpl.html',
                        controller: 'storageDivisionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            division: function () {

                                if (!division || !division.id) {
                                    return division;
                                }

                                return $cbResource.getOne('/storage/division', {'id[EQ]': division.id});

                            },

                            sampleTypeGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-sample-type/division/', 'sampleTypeGridFactory', division, true);

                            },

                            storageContainerGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-storage-container/division/', 'storageContainerGridFactory', division, true);

                            },

                            divisionViewerGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-viewer/division/', 'userGridFactory', division, true);

                            },

                            divisionGroupViewerGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-group-viewer/division/', 'groupGridFactory', division, true);

                            },

                            divisionEditorGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-editor/division/', 'userGridFactory', division, true);

                            },

                            divisionGroupEditorGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-group-editor/division/', 'groupGridFactory', division, true);

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }
                    });

                },

                openSampleStorageRemoveModal: function (samplesToRemove) {

                    $modal.open({
                        templateUrl: 'common/storage/partials/storage-sample-remove-tpl.html',
                        controller: 'storageSampleRemoveCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'md',
                        resolve: {

                            samplesToRemove: function () {
                                return samplesToRemove;
                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }
                    });

                },

                openStorageSampleMove: function (sampleMoveMap, division) {

                    return $modal.open({
                        templateUrl: 'common/storage/partials/storage-sample-move-tpl.html',
                        controller: 'storageSampleMoveCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'md',
                        resolve: {

                            sampleMoveMap: function () {
                                return sampleMoveMap;
                            },

                            division: function () {
                                return division;
                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }
                    }).result;

                },

                openDeleteForm: function (division, returnState) {

                    cbFormHelper.openForm("delete", "Division", division.id, '/storage/division', returnState);

                },

                openRestoreForm: function (division, returnState) {

                    cbFormHelper.openForm("restore", "Division", division.id, '/storage/division', returnState);

                },

                openPurgeForm: function (division, returnState) {

                    cbFormHelper.openForm("purge", "Division", division.id, '/storage/division', returnState);

                },

                openCloneInDimensionless: function (sample, division) {

                    $modal.open({
                        templateUrl: 'common/storage/partials/storage-copy-dimensionless-tpl.html',
                        controller: 'storageCopyDimensionlessCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'md',
                        resolve: {

                            sample: function () {

                                return sample;

                            },

                            division: function () {

                                return division;

                            }

                        }
                    });

                },

            };

            return storageFormFactory;

        }
    ])
;
