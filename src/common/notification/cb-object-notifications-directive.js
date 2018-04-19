angular.module('notification.cbObjectNotificationsDirective', [])

    .directive('cbObjectNotifications', ['objectNotificationFormFactory', 'objectNotificationFormFactory', 'sessionFactory',

        function (objectNotificationFormFactory, objectNotificationFormFactory, sessionFactory) {

            return {

                restrict: 'A',

                scope: {
                    entity: '@',
                    objectDescription: '@',
                    adminRole: '@',
                    url: '@'
                },

                link: function ($scope, element, attrs) {

                    if (!sessionFactory.hasRole($scope.adminRole)) {
                        element.remove();
                    }

                    element.on('click', function () {
                        objectNotificationFormFactory.openAdministratorForm($scope.entity, $scope.objectDescription, $scope.adminRole, $scope.url);
                    });

                }

            };

        }

    ])
;
