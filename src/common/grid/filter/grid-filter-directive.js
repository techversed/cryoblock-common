angular.module('grid.gridFilterDirective', [])

    .directive('gridFilter', ['$controller',

        function ($controller) {

            return {

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

                    $controller($scope.filter.controllerName, {$scope: $scope});

                }
            };

        }

    ])
;
