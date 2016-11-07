angular.module('notification.objectNotificationFormCtrl', [])

    .controller('objectNotificationFormCtrl', ['$scope', '$uibModalInstance', '$cbResource', 'toastr', 'objectNotification', 'objectType', 'groupGrid',

        function ($scope, $uibModalInstance, $cbResource, toastr, objectNotification, objectType, groupGrid) {

            $scope.objectType = objectType;
            $scope.objectNotificationForm = {};
            $scope.objectNotification = objectNotification ? objectNotification : {objectType: objectType};

            $scope.onCreateGroupGrid = angular.copy(groupGrid);
            $scope.onUpdateGroupGrid = angular.copy(groupGrid);
            $scope.onDeleteGroupGrid = angular.copy(groupGrid);

            $scope.searchGroups = function (search) {

                return $cbResource.get('/group', {cSearch:search}).then(function (response) {
                    return response.data;
                });


            };

            $scope.close = function () {

                if ($scope.objectNotificationForm.$pristine === false) {
                    console.log('not pristine');

                }

                $uibModalInstance.close();

            };

            $scope.submit = function (isValid) {

                var method = $scope.objectNotification.id !== undefined ? 'update' : 'create';

                var url = method === 'update'
                    ? '/object-notification?id[EQ]=' + $scope.objectNotification.id
                    : '/object-notification'
                ;

                $cbResource[method](url, $scope.objectNotification).then(

                    function (response) {

                        toastr.info('Sample notifications updated successfully');
                        $scope.close();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            };

        }

    ])
;
