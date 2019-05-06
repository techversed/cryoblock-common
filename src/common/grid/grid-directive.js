angular.module('grid.gridDirective', [])

    .directive('grid', ['$cbResource', '$location', 'gridManager',

        function ($cbResource, $location, gridManager) {

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
                        if (!gridManager.ignoreUrlParams && $scope.grid.bindToState && getParams['cSearch'] !== undefined) {
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

                        $scope.grid.refreshCount += 1;
                        var currentRefreshCounter = $scope.grid.refreshCount;

                        console.log("start: ", currentRefreshCounter);

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

                        console.log("refreshing with url set to: ", $scope.grid.resourceUrl);

                        $cbResource.get($scope.grid.resourceUrl, params).then(function (response) {
                            console.log(currentRefreshCounter);
                            if (currentRefreshCounter == $scope.grid.refreshCount) {
                                $scope.grid
                                    .setResults(response.data)
                                    .setPaginationFromResponse(response)
                                ;
                            }

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

                    $scope.downloadCsvGrid = function () {

                        // var indexIn = function(foo, bar){

                        //     console.log("foo", foo, "bar", bar);

                        //     console.log("doing the thing");

                        //     var tmp = foo;
                        //     angular.forEach(bar.split(".")){

                        //         return foo[bar];

                        //     }
                        // }

                        var headers = [];

                        angular.forEach($scope.grid.columns, function (column) {

                            if(column.isVisible){

                                headers.push(column.header);

                            }

                        });

                        console.log($scope.grid.results);

                        angular.forEach($scope.grid.results, function (result) {

                            angular.forEach($scope.grid.columns, function (column) {

                                if (column.isVisible) {

                                    // If we are going to make the MTM thing work then we are going to need to add an if statement here which checks to see if the thing is an mtm first...

                                    // console.log(result[column.bindTo]);
                                    // if (result && column['bindTo']) {

                                        var thing2 = column['bindTo'].split("|")[0].split(".")[0];

                                        console.log("thing2 is:", thing2);
                                        console.log("evaluating if");
                                        if (eval("result."+thing2)) {
                                            console.log("made it into the thing");
                                            // console.log(result);
                                            console.log(column['bindTo']);

                                            var thingToBind = column['bindTo'].split("|")[0];
                                            console.log(eval("result." + thingToBind));

                                        }

                                    // console.log(indexIn(result, column['bindTo']));
                                    // }
                                    // console.log(indexIn(result, column['bindTo']));

                                }

                            });

                        });

                        console.log(headers);

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
