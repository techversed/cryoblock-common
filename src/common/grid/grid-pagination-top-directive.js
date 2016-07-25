angular.module('grid.gridPaginationTopDirective', [])
    .directive('gridPaginationTop', [

        function () {

            return {

                require: '^grid',
                restrict: 'E',
                scope: true,
                templateUrl: 'common/grid/partials/grid-pagination-top-tpl.html',
                controller: function ($scope) {

                    $scope.model = {
                        options: [
                            {value: 10},
                            {value: 25},
                            {value: 50},
                            {value: 100}
                        ]
                    };

                    $scope.model.perPage = $scope.model.options[0];

                },
                link: function (scope, element, attrs, gridCtrl) {

                    gridCtrl.setPerPage(scope.model.perPage.value);

                    scope.updatePerPage = function () {

                        gridCtrl.setPerPage(scope.model.perPage.value);

                        // now refresh the grid
                        gridCtrl.refresh();

                    };

                    scope.updateSearch = function () {

                        gridCtrl.setSearch(scope.model.search);

                        // now refresh the grid
                        gridCtrl.refresh();

                    };
                }

            };

        }

    ])
;
