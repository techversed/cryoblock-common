angular.module('storage.catalog.catalogCtrl', [])

    .controller('catalogCtrl', ['$scope', 'grid',

        function ($scope, grid) {

            $scope.grid = grid;

        }

    ])
;
