angular.module('gridForm.gridFormColumn.gridFormSingleRelationColumnDirective', [])

    .directive('gridFormSingleRelationColumn', [

        function () {

            /*

                Need to add a way to create a new a new entry if a name does not exist.

            */

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/single-relation/partials/grid-form-single-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {
                        $scope.catalog = {};
                        $scope.sample = {'catalog': {}};

                    };

                    init();

                }
            };
        }
    ]
);
