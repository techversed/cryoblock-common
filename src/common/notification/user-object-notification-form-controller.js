angular.module('notification.userObjectNotificationFormCtrl', [])

    .controller('userObjectNotificationFormCtrl', ['$scope', 'userObjectNotification', '$cbForm', 'sessionFactory', 'entityDetail',

        function ($scope, userObjectNotification, $cbForm, sessionFactory,  entityDetail) {

            var loggedInUser = sessionFactory.getLoggedInUser();
            $scope.userObjectNotification = userObjectNotification ? userObjectNotification : {entityDetail: entityDetail, user: loggedInUser};
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
