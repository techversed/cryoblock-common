/*

    Under construction

*/
angular.module('gridForm.gridFormColumn.gridFormTextColumnDirective', [])

    .directive('gridFormTextColumn', [

        /*
            This directive allows for free form input -- it does not offer suggestions or anything fancy

            Properties to be supported
                required -- This can be done by sharing the form's controller
                fieldName

                validators??? -- This would probably be a good thing to support long term but we might as well use a different form element type.
        */

        function () {

            return {

                scope: {
                    obj: '=',
                    fieldId: '=',
                    field: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/text/partials/grid-form-text-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {

                    };

                    $scope.keyPressHandler = function(event, key) {
                        if (event.key == "Enter") {
                                event.preventDefault();
                        }
                    }

                    init();

                }


            };
        }
    ]
);
