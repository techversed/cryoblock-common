angular.module('form.cbFormGroupDirective', [])

    .directive('cbFormGroup', [

        function () {

            return {
                require: '^form',
                restrict: 'E',
                templateUrl: 'common/form/cb-form-group/partials/cb-form-group-tpl.html',
                transclude: true,
                scope: { label: '@', name: '@'},
                link: function ($scope, element, attrs, formCtrl) {
                    $scope.formCtrl = formCtrl;
                }
            }
        }

    ])
;
