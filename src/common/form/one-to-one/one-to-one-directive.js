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

                    });

                    $scope.onSelect = function (item) {

                        $scope.$emit('form:changed');

                    };

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
