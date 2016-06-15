angular.module('dashboard.dashboardCtrl', [])
    .controller('dashboardCtrl', ['$scope',
        function ($scope) {

            $scope.userName = 'Example user';
            $scope.helloText = 'Welcome in SeedProject';
            $scope.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

        }
    ])
;
