angular.module('notification.objectNotificationFormCtrl', [])

    .controller('objectNotificationFormCtrl', ['$scope', 'groupObjectNotification', 'onCreateGroupGrid', 'onUpdateGroupGrid', 'onDeleteGroupGrid', '$cbForm', 'adminRole', 'entityDetail',

        function ($scope, groupObjectNotification, onCreateGroupGrid, onUpdateGroupGrid, onDeleteGroupGrid, $cbForm, adminRole, entityDetail) {

            $scope.groupObjectNotification = groupObjectNotification ? groupObjectNotification : {entityDetail: entityDetail};
            $scope.onCreateGroupGrid = onCreateGroupGrid;
            $scope.onUpdateGroupGrid = onUpdateGroupGrid;
            $scope.onDeleteGroupGrid = onDeleteGroupGrid;

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
