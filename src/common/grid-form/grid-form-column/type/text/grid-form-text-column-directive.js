angular.module('gridForm.gridFormColumn.gridFormTextColumnDirective', [])
    .directive('gridFormTextColumn', [
        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/text/partials/grid-form-text-column-directive-tpl.html',

                controller: function ($scope) {
                    console.log("testing");


                    var init = function () {

                        console.log('grid form text column directive');

                    };

                    init();

                }

            };
        }
    ]
);
