angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', 'workingSetFactory',

        function ($scope, sessionFactory, navigationInitializer, workingSetFactory) {

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            this.workingSet = function () {

                workingSetFactory.openFormModal();

            }

            if (sessionFactory.isLoggedInUser()) {

                this.user = sessionFactory.getLoggedInUser();

            }

            this.hasRole = sessionFactory.hasRole;

        }

    ])
;
