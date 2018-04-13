angular.module('form.oneToOne.oneToOneDirective', [])

    .directive('oneToOne', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {

                require: ['^form', 'ngModel'],

                restrict: 'E',

                templateUrl: 'common/form/one-to-one/partials/one-to-one-tpl.html',

                scope: {
                    grid: '=',
                    parentObject: '=',
                    bindTo: '@',
                    resourceUrl: '@',
                    placeholder: '@',
                    name: '@',
                    showGrid: '@'
                },

                controller: function ($scope) {

                    if ($scope.parentObject[$scope.bindTo]) {

                        $scope.grid.selectItem($scope.parentObject[$scope.bindTo], true);

                    }

                    $scope.$watch('grid.selectedItem', function (v) {

                        $scope.parentObject[$scope.bindTo] = v;
                        if (v) { $scope.showGrid = false; }

                    });

                    $scope.onSelect = function (item) {

                        $scope.$emit('form:changed');

                    };

                    $scope.toggle = function () {
                        $scope.showGrid = $scope.showGrid ? false : true;
                    };

                    $scope.removeItem = function () {
                        $scope.grid.unselectItem();
                        $scope.toggle();
                    };

                    $scope.showGrid = false;

                },

                link: function ($scope, element, attrs, ctrls) {

                    if (attrs.name === undefined) {
                       throw new Error('oneToOne: name attribute must be specified');
                    }

                    $scope.modelCtrl = ctrls[1];
                    $scope.formCtrl = ctrls[0];
                    $scope.formCtrl.$addControl($scope.modelCtrl);

                    $scope.$on('form:changed', function () {
                        $scope.formCtrl.$pristine = false;
                    });

                }

            }

        }

    ])

;
