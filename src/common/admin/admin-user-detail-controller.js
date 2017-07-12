angular.module('admin.adminUserDetailCtrl', [])

    .controller('adminUserDetailCtrl', ['$scope', 'user', 'userFormFactory', 'groups', '$uibModal','sessionFactory',

        function ($scope, user, userFormFactory, groups, $modal, sessionFactory) {

            $scope.user = user;
            $scope.groups = groups;
            $scope.edit = userFormFactory.openFormModal;

            $scope.canDisable = true;
            if ($scope.user.id === sessionFactory.getLoggedInUser().id) {
                $scope.canDisable = false;

            }
            if (!$scope.user.enabled) {
                $scope.canDisable = false;
            }


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

                            return $scope.user;

                        }

                    }
                });
            }
        }

    ])
;
