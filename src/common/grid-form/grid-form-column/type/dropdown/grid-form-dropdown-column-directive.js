/*
    Gridform Dropdown Column
    Written by Taylor Jones

    This column type is used when there is a finite list of possible inputs for a given field.
    Unlike the relations this dropdown does not have any communication with the backend.
    Searching will be performed within the interface

    Allow creation will not be supported.

    minrequired
    maxrequired

*/

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
