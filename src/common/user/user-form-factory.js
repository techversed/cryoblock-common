angular.module('user.userFormFactory', [])

    .factory('userFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', 'userGridFactory', 'groupGridFactory',

        function ($uibModal, $state, $stateParams, $cbResource, userGridFactory, groupGridFactory) {

            var userFormFactory = {

                openFormModal: function (user) {

                    $uibModal.open({
                        templateUrl: 'common/user/partials/user-form-modal-tpl.html',
                        controller: 'userFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            user: function () {

                                return user;

                            },

                            groups: function () {

                                return userGridFactory.getGroupGrid(user ? user.id : null, true);

                            },

                            groupSelectGrid: function () {

                                return groupGridFactory.getSelectGrid();

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

            return userFormFactory;
        }

    ])
;
