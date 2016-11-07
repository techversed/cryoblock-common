angular.module('notification.cbObjectNotificationsDirective', [])

    .directive('cbObjectNotifications', ['objectNotificationFormFactory',

        function (objectNotificationFormFactory) {

            return {

                restrict: 'A',
                scope: {
                    objectType: '@'
                },
                link: function ($scope, element, attrs) {

                    element.on('click', function () {
                        objectNotificationFormFactory.openForm($scope.objectType);
                    });

                }

            };

        }

    ])
;
