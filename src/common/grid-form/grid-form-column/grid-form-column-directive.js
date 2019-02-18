/*
    Grid form column directive
    Written by Taylor Jones

    The purpose of this directive is to act as a layer of abstraction between the GridForm class and all of the various types of columns that are/will_be supported in the final implementation.


*/

angular.module('gridForm.gridFormColumn.gridFormColumnDirective', [])
    .directive('gridFormColumn', [

        function () {

            return {

                scope: {
                    column: "=",
                    data: "=",
                    field: "="
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/partials/grid-form-column-directive-tpl.html',

                controller: function ($scope) {

                    console.log("Column directive");

                    var init = function () {

                        console.log($scope.col);

                        console.log("Currently in the init function for the column directive.");

                    };

                    init();

                }
            };
        }
    ]
);
