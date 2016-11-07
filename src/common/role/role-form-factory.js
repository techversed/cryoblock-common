angular.module('role.roleFormFactory', [])

    .factory('roleFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource',

        function ($uibModal, $state, $stateParams, $cbResource) {

            var roleFormFactory = {

                openFormModal: function (role) {

                    $uibModal.open({
                        templateUrl: 'common/role/partials/role-form-modal-tpl.html',
                        controller: 'roleFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            role: function () {

                                return role;

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

            return roleFormFactory;
        }

    ])
;
