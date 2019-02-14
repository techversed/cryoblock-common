angular.module('gridForm.gridFormColumn.gridFormDropdownColumnDirective', [])

    .directive('gridFormDropdownColumn', [

        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/dropdown/partials/grid-form-dropdown-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {

                    };

                    init();

                }
            };
        }
]);
