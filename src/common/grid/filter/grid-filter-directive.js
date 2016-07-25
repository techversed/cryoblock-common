angular.module('grid.gridFilterDirective', [])

    .directive('gridFilter', ['$controller',

        function ($controller) {

            return {

                require: '^grid',
                scope: {
                    filter: '='
                },
                restrict: 'E',
                template: '<div class="grid-filter-template" ng-include="filter.templateUrl"></div>',
                link: function ($scope, element, attrs, gridCtrl) {

                    if ($scope.filter.controllerName === undefined) {
                        throw new Error('Filter property controller name must be defined');
                    }

                    if ($scope.filter.templateUrl === undefined) {
                        throw new Error('Filter property templateUrl must be defined');
                    }

                    if ($scope.filter.isVisible === undefined) {
                        throw new Error('Filter property isVisible must be defined');
                    }

                    if ($scope.filter.isFiltering === undefined) {
                        throw new Error('Filter property isFiltering must be defined');
                    }

                    $scope.grid = gridCtrl.grid;

                    $controller($scope.filter.controllerName, {$scope: $scope});

                }
            };

        }

    ])
;
