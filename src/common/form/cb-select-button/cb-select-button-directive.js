angular.module('form.cbSelectButtonDirective', [])

    .directive('cbSelectButton', [

        function () {

            return {
                // require: ['?^form'],
                require: ['?^form', 'ngModel'],
                restrict: 'E',
                templateUrl: 'common/form/cb-select-button/partials/cb-select-button-directive-tpl.html',
                scope: {
                    label: '@',
                    items: '=',
                    bindTo: '=',
                    buttonWidth: '@',
                    name: '@',
                    cbOnSelect: '=',
                    cbOnSelectData: '=',
                    disabled: '=',
                    cbIsOpen: '=',
                    cbOnSelectContext: '=',
                    iconClass: '@'
                },
                controller: function ($scope) {

                    $scope.width =  $scope.width ? $scope.width : "100%";

                },
                link: function ($scope, element, attrs, ctrls) {

                    if (attrs.name === undefined) {
                       throw new Error('cbDropDown: name attribute must be specified');
                    }

                    $scope.modelCtrl = ctrls[1];

                    if (ctrls[0] !== null) {
                        $scope.isFormCtrl = true;
                        $scope.formCtrl = ctrls[0];
                        $scope.formCtrl.$addControl($scope.modelCtrl);
                    }

                    // $scope.buttonClass = 'btn-white';

                    // if (attrs.cbDropdownPrimary !== undefined) {
                    //     $scope.buttonClass = 'btn-primary';
                    // }

                    // if (attrs.cbDropdownInfo !== undefined) {
                    //     $scope.buttonClass = 'btn-info';
                    // }

                    $scope.getClass = function(thing) {
                        if(thing){
                            return 'btn-primary';
                        }
                        else {
                            return 'btn-info';
                        }
                    }


                    $scope.selectItem = function (item) {

                        $scope.modelCtrl.$setViewValue(item);
                        // $scope.bindTo = item;

                        if (typeof $scope.cbOnSelect === 'function') {

                            if ($scope.cbOnSelectContext) {
                                $scope.cbOnSelect = $scope.cbOnSelect.bind($scope.cbOnSelectContext);
                            }

                            $scope.cbOnSelect(item, $scope.cbOnSelectData);

                        }

                    };

                }
            }
        }

    ])
;
