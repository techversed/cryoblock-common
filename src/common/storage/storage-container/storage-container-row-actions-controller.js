angular.module('storageContainer.storageContainerRowActionsCtrl', [])

    .controller('storageContainerRowActionsCtrl', ['$scope', 'storageContainerFormFactory',

        function ($scope, storageContainerFormFactory) {

            $scope.edit = storageContainerFormFactory.openFormModal
            $scope.delete = storageContainerFormFactory.openDeleteForm
            $scope.restore = storageContainerFormFactory.openRestoreForm
            $scope.purge = storageContainerFormFactory.openPurgeForm

        }

    ])
;
