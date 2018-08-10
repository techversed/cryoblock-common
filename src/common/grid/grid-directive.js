angular.module('grid.gridDirective', [])

    .directive('grid', ['$cbResource', '$location',

        function ($cbResource, $location) {

            return {

                scope: {
                    grid: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid/partials/grid-directive-tpl.html',

                controller: function ($scope) {

                    this.grid = $scope.grid;
                    $scope.previousParams = null;

                    var init = function () {

                        var getParams = $location.search();
                        if ($scope.grid.bindToState && getParams['cSearch'] !== undefined) {
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

                        if ($scope.grid.bindToState && $scope.grid.search) {
                            $location.search('cSearch', $scope.grid.search);
                            $location.replace();
                        }

                        if ($scope.grid.bindToState) {
                            $location.search(params);
                            $location.replace();
                        }


                        var cloned_params = angular.copy(params)
                        delete cloned_params['cPage'];
                        var eq = angular.equals($scope.previousParams, cloned_params);

                        if ($scope.previousParams && !eq) {
                            params['cPage'] = 1;
                        }

                        $scope.previousParams = cloned_params;

                        $cbResource.get($scope.grid.resourceUrl, params).then(function (response) {

                            $scope.grid
                                .setResults(response.data)
                                .setPaginationFromResponse(response)
                            ;

                        });

                    };

                    $scope.removeItem = function (item) {

                        $scope.grid.removeItem(item);

                    };

                    $scope.selectItem = function (item) {

                        $scope.grid.selectItem(item);

                    };

                    $scope.addItem = function (item) {

                        $scope.grid.addItem(item);

                    };

                    $scope.unselectItem = function (item) {

                        $scope.grid.unselectItem();

                    };

                    $scope.removeAddingItem = function (item) {

                        $scope.grid.removeAddingItem(item);

                    };

                    $scope.isRemoving = function (item) {
                        return $scope.grid.removingItemIds.indexOf(item.id) !== -1;
                    };

                    $scope.isAdding = function (item) {
                        return $scope.grid.addingItemIds.indexOf(item.id) !== -1;
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
