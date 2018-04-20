angular.module('grid.gridShowColumnsDirective', [])
    .directive('gridShowColumns', ['$filter',

        function ($filter) {

            return {

                scope: {
                    grid: '=',
                },
                restrict: 'E',
                templateUrl: 'common/grid/partials/grid-show-columns-directive-tpl.html',
                link: function ($scope, element, attrs) {

                    $scope.visibleColumns = [];
                    $scope.hiddenColumns = [];

                    angular.forEach($scope.grid.columns, function (column) {

                        column.isVisible
                            ? $scope.visibleColumns.push(column)
                            : $scope.hiddenColumns.push(column)
                        ;

                    });

                    $scope.toggleColumn = function (column) {

                        if (column.isPrimary) {
                            return;
                        }

                        !column.isVisible
                            ? $scope.visibleColumns.splice($scope.visibleColumns.indexOf(column), 1)
                            : $scope.hiddenColumns.splice($scope.hiddenColumns.indexOf(column), 1)
                        ;

                        !column.isVisible
                            ? $scope.hiddenColumns.push(column)
                            : $scope.visibleColumns.push(column)
                        ;

                        $scope.searchText = '';

                    };

                }

            };

        }

    ])
;
