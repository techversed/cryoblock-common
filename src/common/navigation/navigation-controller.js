angular.module('navigation.navigationCtrl', [])
    .controller('navigationCtrl', ['$scope', 'sessionFactory',
        function ($scope, sessionFactory) {

            var user = sessionFactory.getLoggedInUser;

            $scope.userName = user.username;
            $scope.helloText = 'Welcome in SeedProject';
            $scope.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

            $scope.logout = function () {

                sessionFactory.logout();

            }

        }
    ])
;
