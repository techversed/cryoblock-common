angular.module('profile.changePasswordCtrl', [])

    .controller('changePasswordCtrl', ['$scope', '$uibModalInstance', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, $cbResource, toastr, callback) {

            $scope.changePasswordForm = {};
            $scope.success = false;

            $scope.submit = function (isValid) {

                if ($scope.password !== $scope.passwordConfirm) {
                    toastr.error('Passwords must match, please try again');
                    return;
                }

                $cbResource.create('/user/password/reset', data).then(

                    function (response) {

                        toastr.info('Password Changed');
                        $modalInstance.close();
                        callback();

                    },

                    function (response) {

                        toastr.error('Sorry, an error occured while processing your request, please try again later.');

                    }

                );

            }

            $scope.close = function () {
                $modalInstance.close();
            }

        }

    ])
;
