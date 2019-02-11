angular.module('login.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', 'sessionFactory', 'toastr', 'loginParams', 'redirectService',
        function ($scope, $state, sessionFactory, toastr, loginParams, redirectService) {

            /*
                In the long term we need to change this to not depend upon the user using common.

            */

            if (sessionFactory.getLoggedInUser()) {

                if (sessionFactory.hasRole('ROLE_USER'))
                {
                    $state.go('profile.index');
                }
                else if (sessionFactory.hasRole('ROLE_UNDERGRAD_STUDENT_WORKER'))
                {
                    $state.go('order.index');
                }
            }
            else {
                console.log("The call to sessionFactory.getLoggedInUser() failed");
            }

            $scope.loginParams = loginParams;

            $scope.submit = function () {

                sessionFactory.login($scope.username, $scope.password).then(

                    function (response) {

                        if (redirectService.redirectToState) {
                            $state.go(redirectService.redirectToState, redirectService.redirectToStateParams);
                        }
                        else if (sessionFactory.hasRole('ROLE_USER')) {
                            $state.go('sample.index');
                        }
                        else if (sessionFactory.hasRole('ROLE_UNDERGRAD_STUDENT_WORKER')) {
                            $state.go('order.index');
                        }

                    },

                    function () {

                        toastr.error('Incorrect username or password. Please try again.');

                    }

                );

            }

        }
    ])
;
