angular.module('grid.gridPaginationDirective', [])
    .directive('gridPagination', [

        function () {

            return {

                restrict: 'E',
                transclude: true,
                templateUrl: 'common/grid/partials/grid-pagination-tpl.html',
                link: function ($scope, element, attrs, gridCtrl) {

                    var init = function () {

                        console.log($scope.grid);
                        $scope.pagination = $scope.grid.pagination;
                        $scope.perPage = $scope.pagination.perPage;
                        $scope.page = $scope.pagination.page;
                        $scope.hasNextPage = $scope.pagination.hasNextPage;
                        $scope.paginatedTotal = $scope.pagination.paginatedTotal;
                        $scope.unpaginatedTotal = $scope.pagination.unpaginatedTotal;

                        $scope.startIndex = $scope.perPage * $scope.page - $scope.perPage + 1;
                        $scope.stopIndex = $scope.perPage * $scope.page - $scope.perPage + $scope.paginatedTotal;

                        $scope.model =  {
                            page: $scope.page
                        };

                        // set the current page
                        // gridCtrl.setPage($scope.model.page);

                    };

                    $scope.onPageChange = function () {

                        // update the page
                        $scope.grid.setPage($scope.model.page);

                        // now refresh the grid
                        $scope.refresh();

                        init();

                    };

                    init();

                }

            };

        }

    ])
;
