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

                            groupGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/user-group/user/', 'groupGridFactory', user, true)

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
