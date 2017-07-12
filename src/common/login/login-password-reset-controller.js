angular.module('login.passwordResetCtrl', [])

    .controller('passwordResetCtrl', [ '$scope', '$state', '$cbResource', 'toastr',

        function ($scope, $state, $cbResource, toastr) {

            $scope.resetPasswordForm = {};
            $scope.success = false;

            $scope.submit = function () {

                $cbResource.create('/user/password-reset', {email:$scope.email}).then(

                    function (response) {

                        $scope.success = true;

                    },

                    function (response) {

                        toastr.error('Sorry, an error occured while processing your request, please try again later.');

                    }
                );

            }

        }

    ])
;
