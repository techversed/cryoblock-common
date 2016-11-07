angular.module('group.groupFormFactory', [])

    .factory('groupFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', 'groupGridFactory',

        function ($uibModal, $state, $stateParams, $cbResource, groupGridFactory) {

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

                            roleGrid: function () {

                                return groupGridFactory.getRoleGrid(group ? group.id : null, true);

                            },

                            userGrid: function () {

                                return groupGridFactory.getUserGrid(group ? group.id : null, true);

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
