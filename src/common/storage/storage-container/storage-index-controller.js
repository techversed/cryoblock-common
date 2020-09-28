angular.module('storageContainer.storageContainerIndexCtrl', [])

    .controller('storageContainerIndexCtrl', ['$scope', 'grid', 'storageContainerFormFactory', '$window',

        function ($scope, grid, storageContainerFormFactory, $window) {

            $window.scroll(0,0);

            $scope.grid = grid;
            $scope.create = storageContainerFormFactory.openFormModal

        }

    ])
;
