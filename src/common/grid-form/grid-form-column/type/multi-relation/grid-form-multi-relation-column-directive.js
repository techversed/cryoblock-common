angular.module('gridForm.gridFormColumn.gridFormMultiRelationColumnDirective',[])
    .directive('gridFormMultiRelationColumn', [

        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/multi-relation/partials/grid-form-multi-relation-column-directive-tpl.html',

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
