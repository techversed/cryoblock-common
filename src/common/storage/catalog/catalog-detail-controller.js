angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'grids',

        function ($scope, catalog, grids) {

            $scope.catalog = catalog;

            $scope.grids = grids;

        }

    ])
;
