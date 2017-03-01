angular.module('group.groupFormFactory', [])

    .factory('groupFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', 'groupGridFactory', 'roleGridFactory', 'userGridFactory',

        function ($uibModal, $state, $stateParams, $cbResource, groupGridFactory, roleGridFactory, userGridFactory) {

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

                                return groupGridFactory.getRoleGrid(group ? group.id : null, true);

                            },

                            users: function () {

                                return groupGridFactory.getUserGrid(group ? group.id : null, true);

                            },

                            roleSelectGrid: function () {

                                return roleGridFactory.getSelectGrid();

                            },

                            userSelectGrid: function () {

                                return userGridFactory.getSelectGrid();

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
