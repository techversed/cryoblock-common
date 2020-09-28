
angular.module('storageContainer.storageContainerFormCtrl', [])

    .controller('storageContainerFormCtrl', ['$scope', '$uibModalInstance', 'storageContainer', '$cbResource', 'toastr', 'callback', '$cbForm',

        function ($scope, $modalInstance, storageContainer, $cbResource, toastr, callback, $cbForm) {

            $scope.storageContainer = storageContainer ? angular.copy(storageContainer) : {};
            $scope.storageContainerForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Storage Container')
                .setObject($scope.storageContainer)
                .setUrl('/storage/storage-container')
                .setObjectClass('AppBundle\\Entity\\Storage\\StorageContainer')
            ;

            $scope.close = function (){

                $scope.cbForm.close($scope.storageContainerForm,$scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.storageContainerForm, $scope);
            };

        }

    ])
;
