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

                    console.log("testing");


                    var init = function () {

                        console.log("doing the init portion of the work right now");

                    };

                    init();

                }
            };
        }
]);
