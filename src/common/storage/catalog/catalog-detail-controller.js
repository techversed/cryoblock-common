angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'grids', 'catalogFormFactory',

        function ($scope, catalog, grids, catalogFormFactory) {

            $scope.catalog = catalog;

            $scope.grids = grids;

            $scope.edit = catalogFormFactory.openFormModal;

            $scope.delete = catalogFormFactory.openDeleteForm;

        }

    ])
;
