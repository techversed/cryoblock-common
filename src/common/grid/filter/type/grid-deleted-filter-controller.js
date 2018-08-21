angular.module('grid.gridDeletedFilterCtrl', [])

    .controller('gridDeletedFilterCtrl', ['$scope', '$location', 'gridManager',

        function ($scope, $location, gridManager) {

            var init = function () {

                if (!$scope.grid.bindToState || gridManager.ignoreUrlParams) {
                    return;
                }

                var getParams = $location.search();
                var initParam = getParams[$scope.filter.filterProperty]

                if (initParam !== undefined) {

                    if (!initParam) {
                        return;
                    }

                    $scope.filter.isVisible = true;
                    $scope.filter.showDeleted = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.updateSelectionString();
                }

            };

            $scope.update = function () {
                $scope.$emit('grid.refresh');
            };

            $scope.selectItem = function (item) {
                $scope.filter.selectItem(item);
                $scope.$emit('grid.refresh');
            };

            $scope.removeItem = function (item) {
                $scope.filter.removeItem(item);
                $scope.$emit('grid.refresh');
            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.clear();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

            init();
        }

    ])
;
