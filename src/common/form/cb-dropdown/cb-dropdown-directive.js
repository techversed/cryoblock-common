angular.module('form.cbDropdownDirective', [])

    .directive('cbDropdown', [

        function () {

            return {
                require: ['?^form', 'ngModel'],
                restrict: 'E',
                templateUrl: 'common/form/cb-dropdown/partials/cb-dropdown-tpl.html',
                scope: {
                    label: '@',
                    items: '=',
                    bindTo: '@',
                    name: '@',
                    cbOnSelect: '='
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

                    $scope.buttonClass = 'btn-white';

                    if (attrs.cbDropdownPrimary !== undefined) {
                        $scope.buttonClass = 'btn-primary';
                    }

                    if (attrs.cbDropdownInfo !== undefined) {
                        $scope.buttonClass = 'btn-info';
                    }

                    $scope.selectItem = function (item) {

                        $scope.modelCtrl.$setViewValue(item);

                        if (typeof $scope.cbOnSelect === 'function') {

                            $scope.cbOnSelect(item);

                        }

                    };

                }
            }
        }

    ])
;
