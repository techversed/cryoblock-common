angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', 'workingSetFormFactory',

        function ($scope, sessionFactory, navigationInitializer, workingSetFormFactory) {

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
