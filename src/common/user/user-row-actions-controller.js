angular.module('user.userRowActionsCtrl', [])

    .controller('userRowActionsCtrl', ['$scope', 'userFormFactory', 'sessionFactory', '$uibModal',

        function ($scope, userFormFactory, sessionFactory, $modal) {

            $scope.canDisable = true;
            if ($scope.result.id === sessionFactory.getLoggedInUser().id) {
                $scope.canDisable = false;

            }
            if (!$scope.result.enabled) {
                $scope.canDisable = false;
            }


            $scope.canReset = false;

            if (sessionFactory.hasRole('ROLE_ADMIN')) {
                $scope.canReset = true;
            }

            $scope.edit = function (user) {

                userFormFactory.openFormModal(user);

            };

            $scope.disable = function (user) {

                userFormFactory.openDisableModal(user);

            };

            $scope.changePassword = function () {
                $modal.open({
                    templateUrl: 'common/user/partials/user-change-password-tpl.html',
                    controller: 'adminResetPasswordCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    resolve: {

                        user: function () {

                            return $scope.result;

                        }

                    }
                });
            }
        }

    ])
;
