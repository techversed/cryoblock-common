angular.module('notification.userObjectNotificationFormCtrl', [])

    .controller('userObjectNotificationFormCtrl', ['$scope', 'userObjectNotification', '$cbForm', 'entity', 'sessionFactory', 'objectDescription', 'url',

        function ($scope, userObjectNotification, $cbForm, entity, sessionFactory, objectDescription, url) {

            var loggedInUser = sessionFactory.getLoggedInUser();
            $scope.userObjectNotification = userObjectNotification ? userObjectNotification : {entity: entity, user: loggedInUser, url: url, objectDescription: objectDescription};
            $scope.objectDescription = objectDescription;

            $scope.userObjectNotificationForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('User Notification')
                .setObject($scope.userObjectNotification)
                .setUrl('/cryoblock/user-object-notification')
                .setObjectClass('Carbon\\ApiBundle\\Entity\\UserObjectNotification')
            ;

            $scope.close = function (){
                $scope.cbForm.close($scope.userObjectNotificationForm, $scope);
            };

            $scope.save = function () {
                $scope.cbForm.save($scope.userObjectNotificationForm, $scope);
            };

        }

    ])
;
