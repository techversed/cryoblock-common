angular.module('storage.storageFormFactory', [])

    .factory('storageFormFactory', ['$uibModal', 'storageFactory', '$state', '$stateParams', '$cbGridBuilder', '$cbResource',

        function ($modal, storageFactory, $state, $stateParams, $cbGridBuilder, $cbResource) {

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

                            ownerGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('userGridFactory', true);

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

                openStorageSampleMove: function (sampleMoveMap) {

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

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }
                    }).result;

                }

            };

            return storageFormFactory;

        }
    ])
;
