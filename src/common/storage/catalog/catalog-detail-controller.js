angular.module('storage.catalog.catalogDetailCtrl', [])
    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'grids', '$window', 'catalogFormFactory',

        function ($scope, catalog, grids, $window, catalogFormFactory) {

            $window.scroll(0,0);

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
