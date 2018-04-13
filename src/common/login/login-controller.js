angular.module('login.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', 'sessionFactory', 'toastr', 'loginParams', 'redirectService',
        function ($scope, $state, sessionFactory, toastr, loginParams, redirectService) {

            if (sessionFactory.getLoggedInUser()) {
                $state.go('profile.index');
            }

            $scope.loginParams = loginParams;

            $scope.submit = function () {

                sessionFactory.login($scope.username, $scope.password).then(

                    function (response) {

                        if (redirectService.redirectToState) {

                            $state.go(redirectService.redirectToState, redirectService.redirectToStateParams);

                        } else {

                            $state.go('sample.index');

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
