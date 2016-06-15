angular.module('form.cbDropdownDirective', [])

    .directive('cbDropdown', [

        function () {

            return {
                require: ['^form', 'ngModel'],
                restrict: 'E',
                templateUrl: 'common/form/cb-dropdown/partials/cb-dropdown-tpl.html',
                scope: {
                    label: '@',
                    items: '=',
                    bindTo: '@',
                    name: '@'
                },
                link: function ($scope, element, attrs, ctrls) {

                    if (attrs.name === undefined) {
                       throw new Error('cbDropDown: name attribute must be specified');
                    }

                    $scope.formCtrl = ctrls[0];
                    $scope.modelCtrl = ctrls[1];

                    $scope.formCtrl.$addControl($scope.modelCtrl);

                    $scope.buttonClass = 'btn-white';

                    if (attrs.cbDropdownPrimary !== undefined) {
                        $scope.buttonClass = 'btn-primary';
                    }

                    $scope.selectItem = function (item) {

                        $scope.modelCtrl.$setViewValue(item);

                    };

                }
            }
        }

    ])
;
