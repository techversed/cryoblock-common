angular.module('profile.profileFormFactory', [])

    .factory('profileFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', '$cbGridBuilder',

        function ($uibModal, $state, $stateParams, $cbResource, $cbGridBuilder) {

            var profileFormFactory = {

                openFormModal: function (user) {

                    $uibModal.open({
                        templateUrl: 'common/profile/partials/profile-form-modal-tpl.html',
                        controller: 'profileFormCtrl',
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

            return profileFormFactory;
        }

    ])
;
