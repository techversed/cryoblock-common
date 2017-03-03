angular.module('user.userFormFactory', [])

    .factory('userFormFactory', ['$uibModal', '$state', '$stateParams', '$cbGridBuilder',

        function ($uibModal, $state, $stateParams, $cbGridBuilder) {

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

                                return $cbGridBuilder.buildOTM(
                                    '/user-group/user/', 'groupGridFactory', user, true
                                )

                            },

                            groupSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('groupGridFactory');

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

                openDisableModal: function (user) {

                    $uibModal.open({
                        templateUrl: 'common/user/partials/user-disable-tpl.html',
                        controller: 'userDisableCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'md',
                        resolve: {

                            user: function () {

                                return user;

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
