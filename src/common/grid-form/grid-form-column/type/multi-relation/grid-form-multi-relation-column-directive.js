angular.module('gridForm.gridFormColumn.gridFormMultiRelationColumnDirective',[])
    .directive('gridFormMultiRelationColumn', [

        function () {


            /*

                Need to add a way to create a new a new entry if a name does not exist.
                Allow the user to select many  of a certain type of object.
                We will not support the creation of new objects at this stage of things --- I don't know exactly what that would look like so I am hesitatnt to do anything related to that.

                minrequired = The form is invalid if fiewer than this number of elements are selected from the list.
                maxrequired = The form is invalid if more than this number of elements are selected



            */

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/multi-relation/partials/grid-form-multi-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {

                    };

                    init();

                }

            };

        }

]);
