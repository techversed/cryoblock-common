angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'grids', '$window',

        function ($scope, catalog, grids, $window) {

            $window.scroll(0,0);

            $scope.catalog = catalog;

            $scope.grids = grids;

        }

    ])
;
