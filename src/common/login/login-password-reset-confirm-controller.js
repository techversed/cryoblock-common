angular.module('login.passwordResetConfirmCtrl', [])

    .controller('passwordResetConfirmCtrl', [ '$scope', '$state', '$cbResource', 'toastr', '$stateParams',

        function ($scope, $state, $cbResource, toastr, $stateParams) {

            $scope.resetPasswordForm = {};
            $scope.success = false;

            $scope.submit = function () {

                if ($scope.password !== $scope.passwordConfirm) {
                    toastr.error('Passwords must match, please try again');
                    return;
                }

                data = {
                    token: $stateParams.token,
                    password: $scope.password
                };

                $cbResource.create('/user/password-reset-confirm', data).then(

                    function (response) {

                        toastr.success('Your password was reset successfully');

                        $state.go('login');

                    },

                    function (response) {

                        toastr.error('Sorry, an error occured while processing your request, please try again later.');

                    }
                );

            }

        }

    ])
;
