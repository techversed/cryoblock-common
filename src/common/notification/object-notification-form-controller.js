angular.module('notification.objectNotificationFormCtrl', [])

    .controller('objectNotificationFormCtrl', ['$scope', 'groupObjectNotification', 'onCreateGroupGrid', 'onUpdateGroupGrid', 'onDeleteGroupGrid', '$cbForm', 'entity', 'objectDescription', 'adminRole', 'url',

        function ($scope, groupObjectNotification, onCreateGroupGrid, onUpdateGroupGrid, onDeleteGroupGrid, $cbForm, entity, objectDescription, adminRole, url) {

            $scope.groupObjectNotification = groupObjectNotification ? groupObjectNotification : {entity: entity, url: url, objectDescription: objectDescription};
            $scope.onCreateGroupGrid = onCreateGroupGrid;
            $scope.onUpdateGroupGrid = onUpdateGroupGrid;
            $scope.onDeleteGroupGrid = onDeleteGroupGrid;
            $scope.objectDescription = objectDescription;

            $scope.groupObjectNotificationForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Administrator Notification')
                .setObject($scope.groupObjectNotification)
                .setUrl('/cryoblock/group-object-notification')
                .setObjectClass('Carbon\\ApiBundle\\Entity\\GroupObjectNotification')
            ;

            $scope.close = function (){
                $scope.cbForm.close($scope.groupObjectNotificationForm, $scope);
            };

            $scope.save = function () {
                $scope.cbForm.save($scope.groupObjectNotificationForm, $scope);
            };

        }

    ])
;
