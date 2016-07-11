angular.module('common.commonCtrl', [])

    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', '$injector',

        function ($scope, sessionFactory, navigationInitializer, $injector) {

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            if (sessionFactory.isLoggedInUser()) {

                this.user = sessionFactory.getLoggedInUser();

            }

            $scope.showNavigationBar = true;

            if ($injector.has('showNavigationBar')) {
                $scope.showNavigationBar = $injector.get('showNavigationBar');
            }
            console.log($scope.showNavigationBar)

        }

    ])
;
