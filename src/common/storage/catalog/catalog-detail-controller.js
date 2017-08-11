angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog',

        function ($scope, catalog) {

            $scope.catalog = catalog;

        }

    ])
;
