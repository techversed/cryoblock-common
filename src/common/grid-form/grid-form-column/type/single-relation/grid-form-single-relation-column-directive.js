angular.module('gridForm.gridFormColumn.gridFormSingleRelationColumnDirective', [])
    .directive('gridFormSingleRelationColumn', [

        /*
            Need to add a way to create a new a new entry if a name does not exist.
            Allow the user to select one of a certain type of object.
            Boolean to allow for the creation of new objects.


            column -- bind to

        */

        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/single-relation/partials/grid-form-single-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {
                        // $scope.catalog = {};
                        // $scope.sample = {'catalog': {}};
                        console.log("running the init funciton in the grid form single relation column directive");
                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];

                    };

                    init();

                }
            };
        }
    ]
);
