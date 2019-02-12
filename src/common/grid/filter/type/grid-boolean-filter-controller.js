angular.module('grid.gridBooleanFilterCtrl', [])

    .controller('gridBooleanFilterCtrl', ['$scope', '$location', 'gridManager',

        function ($scope, $location, gridManager) {


            var init = function () {

                if (!$scope.grid.bindToState || gridManager.ignoreUrlParams) {
                    return;
                }

                var getParams = $location.search();

                var boolParam = getParams[$scope.filter.filterProperty + '[EQ]'];

                if (boolParam === "0" || boolParam === "1") {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.setFromState(boolParam);
                    $scope.filter.updateSelectionString();
                }
            }

            $scope.refresh = function () {

                $scope.filter.refresh();
                $scope.update();

            };

            $scope.update = function () {
                $scope.$emit('grid.refresh');

            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.refresh();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

            init();

        }

    ])
;
