angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', 'workingSetFormFactory', 'workingSetManager',

        function ($scope, sessionFactory, navigationInitializer, workingSetFormFactory, workingSetManager) {

            $scope.wsm = workingSetManager;

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            this.workingSet = function () {

                workingSetFormFactory.openFormModal();

            }

            if (sessionFactory.isLoggedInUser()) {

                this.user = sessionFactory.getLoggedInUser();

            }

            this.hasRole = sessionFactory.hasRole;

        }

    ])
;
