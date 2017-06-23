angular.module('profile.changePasswordCtrl', [])

    .controller('changePasswordCtrl', ['$scope', '$state', '$uibModalInstance', '$cbResource', 'toastr', 'user',

        function ($scope, $state, $modalInstance, $cbResource, toastr, user) {

            $scope.user = user;
            $scope.changePasswordForm = {};
            $scope.success = false;

            $scope.submit = function (isValid) {

                if ($scope.password !== $scope.passwordConfirm) {
                    toastr.error('Passwords must match, please try again');
                    return;
                }

                data = {
                    currentPassword: $scope.currentPassword,
                    password: $scope.password
                };

                $cbResource.create('/user/password/reset', data).then(

                    function (response) {

                        toastr.info('Password Changed');
                        $modalInstance.close();

                    },

                    function (response) {

                        toastr.error('Sorry, an error occured while processing your request, please try again later.');

                    }

                );

            }

        }

    ])
;
