angular.module('storage.catalog.catalogIndexCtrl', [])

    .controller('catalogIndexCtrl', ['$scope', 'grid', '$window',

        function ($scope, grid, $window) {

            $window.scroll(0,0);

            $scope.grid = grid;

        }

    ])
;
