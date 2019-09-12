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


                        var dateRegex = /^\d+-\d+-\d+T\d+:\d+:\d+-\d+:\d+$/
                        var headers = [];

                        var csvContent = "data:text/csv;charset=utf-8,";

                        angular.forEach($scope.grid.columns, function (column) {

                            if(column.isVisible){

                                headers.push(column.header);

                            }

                        });

                        csvContent += (headers.join(",") + "\n");

                        angular.forEach($scope.grid.results, function (result) {

                            var lineArray = [];

                            angular.forEach($scope.grid.columns, function (column) {

                                if (column.isVisible) {

                                    var thing2 = column['bindTo'].split("|")[0].split(".")[0];

                                    eval("result." + thing2)
                                    if (eval("result." + thing2)) {

                                        var thingToBind = column['bindTo'].split("|")[0];
                                        var value = eval("result." + thingToBind);

                                        // If the column is a number
                                        if (value == undefined){
                                            linaArray.push("undefined");
                                        }
                                        if (!isNaN(value)){

                                            lineArray.push(value);

                                        }

                                        // If the column is a string
                                        else if (typeof value == "string")
                                        {

                                            // If the string is an encoded date
                                            if (dateRegex.test(value) == true) {

                                                lineArray.push((new Date(value)).toDateString().replace(/,/g,""));

                                            }
                                            // If the string is anything else
                                            else {

                                                // Remove characters that could mess up the file
                                                lineArray.push(value.replace(/\#/g,"").replace(/,/g," &").replace("\;",""));

                                            }

                                        }
                                        else{
                                            // This is going to becoem a thing when we start passing arrays of tags instead of the list of tags.
                                            // I don't really know if we are going to end up doing this though -- it would be nice to have the project list offer links directly to the object that you want.

                                            lineArray.push("there is a problem -- tell taylor");

                                        }

                                    }
                                    else{

                                        lineArray.push("");

                                    }

                                }

                            });

                            csvContent += (lineArray.join(",") + "\n");

                        });


                        var day = new Date();
                        var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

                        var filename = $scope.grid.resourceUrl.replace(/\//g, "") + "-" + day.getFullYear() + "-"+ monthNames[day.getMonth()] + "-" + day.getDay() + ".csv";

                        var encodedUri = encodeURI(csvContent);

                        // window.open(encodedUri, "test.csv");
                        var a = document.createElement('a');
                        a.href = encodedUri;
                        a.download = filename;
                        a.click();
                        // window.URL.revokeObjectURL(encodedUri);

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
