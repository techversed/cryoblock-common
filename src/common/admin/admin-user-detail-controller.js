angular.module('admin.adminUserDetailCtrl', [])

    .controller('adminUserDetailCtrl', ['$scope', 'user', 'userFormFactory', 'groups', '$uibModal',

        function ($scope, user, userFormFactory, groups, $modal) {

            $scope.user = user;
            $scope.groups = groups;
            $scope.edit = userFormFactory.openFormModal;

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
