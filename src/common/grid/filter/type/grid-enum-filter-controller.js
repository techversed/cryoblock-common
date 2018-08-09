angular.module('grid.gridEnumFilterCtrl', [])

    .controller('gridEnumFilterCtrl', ['$scope', '$location', 'gridManager',

        function ($scope, $location, gridManager) {

            var init = function () {

                if (!$scope.grid.bindToState || gridManager.ignoreUrlParams) {
                    return;
                }

                var getParams = $location.search();
                var initParam = getParams[$scope.filter.filterProperty + '[IN]']

                if (initParam !== undefined) {

                    if (typeof initParam == 'string') {
                        initParam = [initParam]
                    }

                    $scope.filter.isVisible = true;
                    angular.forEach(initParam, function (item) {
                        $scope.filter.selectItem(item);
                    })
                }

            };

            $scope.form = {
                search: ''
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
