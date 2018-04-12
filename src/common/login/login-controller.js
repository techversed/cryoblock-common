angular.module('login.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', 'sessionFactory', 'toastr', 'loginParams',
        function ($scope, $state, sessionFactory, toastr, loginParams) {

            if (sessionFactory.getLoggedInUser()) {
                $state.go('profile.index');
            }

            $scope.loginParams = loginParams;

            $scope.submit = function () {

                sessionFactory.login($scope.username, $scope.password).then(

                    function (response) {

                        $state.go('profile.index');

                    },

                    function () {

                        toastr.error('Incorrect username or password. Please try again.');

                    }

                );

            }

        }
    ])
;
