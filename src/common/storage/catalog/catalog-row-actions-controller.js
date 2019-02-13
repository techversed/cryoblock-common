angular.module('storage.catalog.catalogRowActionsCtrl', [])

    .controller('catalogRowActionsCtrl', ['$scope', 'catalogFormFactory',

        function ($scope, catalogFormFactory) {

            $scope.edit = catalogFormFactory.openFormModal
            $scope.delete = catalogFormFactory.openDeleteForm
            $scope.restore = catalogFormFactory.openRestoreForm
            $scope.purge = catalogFormFactory.openPurgeForm

        }

    ])
;
