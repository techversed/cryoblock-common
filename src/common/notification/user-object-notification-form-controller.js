angular.module('notification.userObjectNotificationFormCtrl', [])

    .controller('userObjectNotificationFormCtrl', ['$scope', 'userObjectNotification', '$cbForm', 'entity', 'sessionFactory', 'objectDescription', 'url',

        function ($scope, userObjectNotification, $cbForm, entity, sessionFactory, objectDescription, url) {

            console.log("changes to user-object-notification-form-controller");
            $cbResource.getOne('/cryoblock/entity-detail', data).then(function (response){
                        console.log(response);
            });
            console.log("should have printed the response of the entity-detail lookup");

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
