angular.module('gridForm.gridFormColumn.gridFormDropdownColumnDirective', [])
    .directive('gridFormDropdownColumn', [


        function () {

            return {

                scope: {
                    gridForm: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/partials/grid-form-directive-tpl.html',

                controller: function ($scope) {
                    console.log("testing");

                    this.gridForm = $scope.gridForm;

                    var init = function () {

                        console.log("doing the init portion of the work right now");
                        $scope.genders = ['test1', 'test2', 'test3', 'test4'];

                    };

                    init();

                }
            };
        }


]);
