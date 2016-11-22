angular.module('form.oneToOne.oneToOneDirective', [])

    .directive('oneToOne', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {

                require: '^form',

                restrict: 'E',

                templateUrl: 'common/form/one-to-one/partials/one-to-one-tpl.html',

                scope: {
                    grid: '=',
                    parentObject: '=',
                    bindTo: '@',
                    resourceUrl: '@',
                    placeholder: '@'
                },

                controller: function ($scope) {

                    if ($scope.parentObject[$scope.bindTo]) {

                        $scope.grid.selectItem($scope.parentObject[$scope.bindTo]);

                    }

                    $scope.$watch('grid.selectedItem', function (v) {

                        $scope.parentObject[$scope.bindTo] = v;
                        if (v) { $scope.showGrid = false; }

                    });

                    $scope.onSelect = function (item) {

                        $scope.$emit('form:changed');
                        console.log(3123);

                    };

                    $scope.toggle = function () {
                        $scope.showGrid = $scope.showGrid ? false : true;
                    };

                    $scope.removeItem = function () {
                        $scope.grid.unselectItem();
                        console.log($scope.grid);
                        $scope.showGrid = false;
                    };

                    $scope.showGrid = false;

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.$on('form:changed', function () {
                        formCtrl.$pristine = false;
                    });

                }

            }

        }

    ])

;
