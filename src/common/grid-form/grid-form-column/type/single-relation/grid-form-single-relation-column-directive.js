angular.module('gridForm.gridFormColumn.gridFormSingleRelationColumnDirective', [])
    .directive('gridFormSingleRelationColumn', [

        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/single-relation/partials/grid-form-single-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    console.log("testing");

                    var init = function () {

                        console.log("doing the init portion of the work right now");

                    };

                    init();

                }
            };
        }
    ]
);
