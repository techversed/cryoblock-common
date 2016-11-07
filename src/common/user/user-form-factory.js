angular.module('user.userFormFactory', [])

    .factory('userFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource',

        function ($uibModal, $state, $stateParams, $cbResource) {

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
