angular.module('notification.objectNotificationFormCtrl', [])

    .controller('objectNotificationFormCtrl', ['$scope', 'groupObjectNotification', 'onCreateGroupGrid', 'onUpdateGroupGrid', 'onDeleteGroupGrid', '$cbForm', 'entity', 'objectDescription', 'adminRole', 'url', 'entityDetail',

        function ($scope, groupObjectNotification, onCreateGroupGrid, onUpdateGroupGrid, onDeleteGroupGrid, $cbForm, entity, objectDescription, adminRole, url, entityDetail) {
            //no longer need the description or the url above... we can remove that in the cleanup phase....

            $scope.groupObjectNotification = groupObjectNotification ? groupObjectNotification : {entityDetail: entityDetail};//This line needs to be changed...
            $scope.onCreateGroupGrid = onCreateGroupGrid;
            $scope.onUpdateGroupGrid = onUpdateGroupGrid;
            $scope.onDeleteGroupGrid = onDeleteGroupGrid;
            // $scope.objectDescription = objectDescription;
                //, url: url, objectDescription: objectDescription // removed from above... we don't need it though I don't think it will cause problems....

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
