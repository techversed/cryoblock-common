angular.module('grid.gridDirective', [])

    .directive('grid', ['resourceFactory', '$location',

        function (resourceFactory, $location) {

            return {

                scope: {
                    grid: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid/partials/grid-directive-tpl.html',

                controller: function ($scope) {

                    this.grid = $scope.grid;

                    var init = function () {

                        var getParams = $location.search();
                        if (getParams['cSearch'] !== undefined) {
                            $scope.grid.search = getParams['cSearch'];
                        }

                    };

                    $scope.sortColumn = function (column) {

                        if (false === column.isSortable) {
                            return;
                        }

                        var direction = column.sortDirection === column.sort.ASC ? column.sort.DESC : column.sort.ASC;

                        $scope.grid.sortColumn(column, direction, false);

                        $scope.refresh();

                    };

                    $scope.refresh = function () {

                        if ($scope.grid.data) {

                            $scope.grid.turnPage();

                            return;

                        }

                        var params = $scope.grid.getRequestParams();

                        if ($scope.grid.search) {
                            $location.search('cSearch', $scope.grid.search);
                        }

                        if ($scope.grid.bindToState) {
                            $location.search(params);
                        }

                        resourceFactory.get($scope.grid.resourceUrl, $location.search()).then(function (response) {

                            $scope.grid
                                .setResults(response.data, false)
                                .setPaginationFromResponse(response)
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

                    init();

                }

            };

        }

    ])
;
