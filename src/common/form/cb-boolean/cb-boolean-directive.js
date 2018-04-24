angular.module('form.cbBooleanDirective', [])

    .directive('cbBoolean', [

        function () {

            return {
                restrict: 'E',
                templateUrl: 'common/form/cb-boolean/partials/cb-boolean-directive-tpl.html',
                require: ['^form', 'ngModel'],
                scope: {disabled: '=', trueText: '@', falseText: '@', onToggle: '='},
                controller: function ($scope) {
                    $scope.toggle = function (bool) {
                        if (!$scope.disabled) {
                            $scope.modelCtrl.$setViewValue(bool);
                            if ( typeof $scope.onToggle === "function"){
                                $scope.onToggle();
                            }
                        }
                    }

                    $scope.trueText = $scope.trueText ? $scope.trueText : 'Yes';
                    $scope.falseText = $scope.falseText ? $scope.falseText : 'No';

                },
                link: function ($scope, element, attrs, ctrls) {
                    $scope.modelCtrl = ctrls[1];

                    if (ctrls[0] !== null) {
                        $scope.formCtrl = ctrls[0];
                        $scope.formCtrl.$addControl($scope.modelCtrl);
                    }
                }
            }

        }

    ])
;
