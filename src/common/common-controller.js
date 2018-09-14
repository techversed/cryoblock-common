angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer',

        function ($scope, sessionFactory, navigationInitializer) {

            $scope.workingSet = [{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"}];

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            if (sessionFactory.isLoggedInUser()) {

                this.user = sessionFactory.getLoggedInUser();

            }

            this.hasRole = sessionFactory.hasRole;

        }

    ])
;
