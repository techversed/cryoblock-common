angular.module('grid.gridV2Directive', [])

    .directive('gridV2', ['$http', 'API',

        function ($http, API) {

            return {

                scope: {
                    grid: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid/views/grid-v2-directive-tpl.html',

                link: function ($scope, element, attrs) {

                    $scope.sortColumn = function (column) {

                        if (false === column.isSortable) {
                            return;
                        }

                        var direction = column.sortDirection === column.sort.ASC ? column.sort.DESC : column.sort.ASC;

                        $scope.grid.sortColumn(column, direction);

                        $scope.refresh();

                    };

                    $scope.refresh = function () {

                        if ($scope.grid.data) {

                            $scope.grid.turnPage();

                            return;

                        }

                        $http.get(API.url + $scope.grid.getRequestPath()).then(function (response) {

                            $scope.grid
                                .setResults(response.data.data, false)
                                .setPaginationFromResponse(response.data)
                            ;

                        });

                    };

                    $scope.removeItem = function (item) {

                        $scope.$emit('form:changed');

                        $scope.grid.removeItem(item);

                    };

                    $scope.removeAddingItem = function (item) {

                        $scope.grid.removeAddingItem(item);

                    };

                    $scope.isRemoving = function (item) {
                        return $scope.grid.removingItemIds.indexOf(item.id) !== -1;
                    };

                    $scope.restoreRemovedItem = function (item) {

                        $scope.grid.restoreRemovedItem(item);

                    };

                    $scope.$on('grid.refresh', $scope.refresh);

                    $scope.$on('grid.filterToggle', function () {

                        $scope.$broadcast('grid.filter.toggle');

                    });

                }


            };

        }

    ])
;
