angular.module('storage.catalog.catalogDetailCtrl', [])
    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'sequenceGrid', 'grids', '$window', 'catalogFormFactory',

        function ($scope, catalog, sequenceGrid, grids, $window, catalogFormFactory) {

            $window.scroll(0,0);

            $scope.sequenceGrid = sequenceGrid;

            $scope.catalog = catalog;

            $scope.grids = grids;

            $scope.edit = catalogFormFactory.openFormModal;

            $scope.delete = catalogFormFactory.openDeleteForm;

            $scope.statusLabelMapping = {
                'Depleted': 'warning',
                'Available': 'primary',
                'Destroyed': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.catalog.status];

        }

    ])
;
