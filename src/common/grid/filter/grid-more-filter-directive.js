angular.module('grid.gridMoreFilterDirective', [])

    .directive('gridMoreFilter', [

        function () {

            return {

                scope: {
                    grid: '='
                },
                restrict: 'E',
                templateUrl: 'common/grid/filter/partials/grid-more-filter-tpl.html',
                controller: function ($scope) {

                    $scope.updateHiddenFilters = function () {

                        $scope.hiddenFilters = $scope.grid.filters.filter(function (filter) {
                            return filter.isVisible === false;
                        });

                    };

                    $scope.toggleFilter = function (filter) {
                        filter.isVisible = filter.isVisible ? false : true;
                        $scope.updateHiddenFilters();
                        $scope.searchText = '';
                    };

                    $scope.updateHiddenFilters();

                    $scope.$on('grid.filter.toggle', function () {
                        $scope.updateHiddenFilters();
                    });

                }
            };

        }

    ])
;
