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

                            roles: function () {

                                return $cbGridBuilder.buildOTM(
                                    '/group-role/group/', 'roleGridFactory', group, true
                                )

                            },

                            users: function () {

                                return $cbGridBuilder.buildOTM(
                                    '/user-group/group/', 'userGridFactory', group, true
                                )

                            },

                            roleSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('roleGridFactory')

                            },

                            userSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('userGridFactory')

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
