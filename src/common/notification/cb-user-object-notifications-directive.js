angular.module('notification.cbUserObjectNotificationsDirective', [])

    .directive('cbUserObjectNotifications', ['objectNotificationFormFactory',

        function (objectNotificationFormFactory) {

            return {

                restrict: 'A',

                scope: {
                    entity: '@',
                    objectDescription: '@',
                    url: '@'
                },

                link: function ($scope, element, attrs) {

                    element.on('click', function () {
                        objectNotificationFormFactory.openUserForm($scope.entity, $scope.objectDescription, $scope.url);
                    });

                }

            };

        }

    ])
;
