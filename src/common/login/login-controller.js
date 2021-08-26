angular.module('login.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', 'sessionFactory', 'toastr', 'loginParams', 'redirectService',
        function ($scope, $state, sessionFactory, toastr, loginParams, redirectService) {

            /*
                This file has a temporary way of handling redirection -- 'ROLE_UNDERGRAD_STUDENT_WORKER' should honestly be specific to the crowelab -- it would be a good idea to add the ability to have various roles which each have a default path that they can follow.
                I want to handle it like this in the short term due to the fact that we just need to make progress at this point.

            */
            // $state.go('backstock_order.index'); Donut work

            if (sessionFactory.getLoggedInUser()) {

                if (sessionFactory.hasRole('ROLE_USER'))
                {
                    // $state.go('profile.index');
                    $state.go('profile.index');
                }
                else if (sessionFactory.hasRole('ROLE_UNDERGRAD_STUDENT_WORKER')) // we should avoid hard coding this
                {
                    $state.go('backstock_order.index');
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
                            $state.go('profile.index');
                        }
                        else if (sessionFactory.hasRole('ROLE_UNDERGRAD_STUDENT_WORKER')) {
                            $state.go('backstock_order.index');
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
