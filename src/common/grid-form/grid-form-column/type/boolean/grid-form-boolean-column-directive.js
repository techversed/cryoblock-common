angular.module('gridForm.gridFormColumn.gridFormBooleanColumnDirective', [])

    .directive('gridFormBooleanColumn', [

        function () {

            return {
                restrict: 'E',
                templateUrl: 'common/grid-form/grid-form-column/type/boolean/partials/grid-form-boolean-column-directive-tpl.html',
                scope: {disabled: '=', trueText: '@', falseText: '@', onToggle: '=', obj: '=', field: '='},
                controller: function ($scope) {

                    $scope.toggle = function (bool) {
                        if (!$scope.disabled) {
                            $scope.field.$setViewValue(bool);
                            if ($scope.onToggle) {
                                $scope.onToggle();
                            }
                        }
                    };

                    $scope.keyPressHandler = function(event, item){


                    };

                    $scope.trueText = $scope.trueText ? $scope.trueText : 'Yes';
                    $scope.falseText = $scope.falseText ? $scope.falseText : 'No';

                },
                link: function ($scope, element, attrs, ctrls) {
                    $scope.field = ctrls[1];

                    if (ctrls[0] !== null) {
                        $scope.field = ctrls[0];
                        $scope.field.$addControl($scope.field);
                    }

                }

            }

        }

    ])
;


