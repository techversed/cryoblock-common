angular.module('grid.gridDirective', [])
    .directive('grid', ['API', '$http',

        function (API, $http) {

            return {

                restrict: 'E',
                templateUrl: 'common/grid/views/grid-directive-tpl.html',
                transclude: true,
                scope: {
                    initResponse: '=',
                    requestUrl: '@',
                    data: '=',
                },
                controller: function ($scope, $compile) {

                    var gridCtrl = this;

                    this.columns = [];
                    this.sortColumn = null;
                    this.sortDir = null;

                    this.addColumn = function (column) {

                        this.columns.push(column);

                    };

                    this.setSortColumn = function (column, direction) {

                        this.sortColumn = column;
                        this.sortDir = direction;

                        // let other child grid headers know to remove sorting classes
                        $scope.$broadcast('grid.sort', column, direction);

                        this.refresh();
                    };

                    this.setPagination = function (response) {

                        this.pagination = {
                            hasNextPage: response.hasNextPage,
                            page: response.page,
                            paginatedTotal: response.paginatedTotal,
                            perPage: response.perPage,
                            unpaginatedTotal: response.unpaginatedTotal,
                        };

                    };

                    this.setPage = function (page) {

                        this.page = page;

                    };

                    this.setPerPage = function (perPage) {

                        this.perPage = perPage;

                    };

                    this.setSearch = function (search) {

                        this.search = search;

                    };

                    this.refresh = function () {

                        params = [];

                        if (this.sortColumn && this.sortColumn.name) {

                            params.push('cOrderBy=' + this.sortColumn.name);

                        }

                        if (this.sortDir) {

                            params.push('cOrderByDirection=' + this.sortDir);

                        }

                        if (this.search) {

                            console.log(this.search);

                            params.push('cSearch=' + this.search);

                        }

                        params.push('cPage=' + this.page);
                        params.push('cPerPage=' + this.perPage);

                        $http.get(API.url + $scope.requestUrl + '?' + params.join('&')).then(function (response) {

                            $scope.data = response.data.data;

                            gridCtrl.setPagination(response.data);

                            $scope.$broadcast('grid.refresh');

                        });

                    }

                    this.setPagination($scope.initResponse);
                }

            };

        }

    ])
;
