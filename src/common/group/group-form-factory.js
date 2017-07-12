angular.module('group.groupFormFactory', [])

    .factory('groupFormFactory', ['$uibModal', '$state', '$stateParams', '$cbGridBuilder',

        function ($uibModal, $state, $stateParams, $cbGridBuilder) {

            var groupFormFactory = {

                openFormModal: function (group) {

                    $uibModal.open({
                        templateUrl: 'common/group/partials/group-form-modal-tpl.html',
                        controller: 'groupFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            group: function () {

                                return group;

                            },

                            roleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids(
                                    '/group-role/group/', 'roleGridFactory', group, true
                                )

                            },

                            userGrids: function () {

                                return $cbGridBuilder.buildMTMGrids(
                                    '/user-group/group/', 'userGridFactory', group, true
                                )

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                }

            };

            return groupFormFactory;
        }

    ])
;
