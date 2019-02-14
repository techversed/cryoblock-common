angular.module('gridForm.gridFormColumn.gridFormTextColumnDirective', [])

    .directive('gridFormTextColumn', [

        function () {

            return {

                scope: {
                    obj: '=',
                    field: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/text/partials/grid-form-text-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {

                    };

                    init();

                }
            };
        }
    ]
);
