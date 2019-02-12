angular.module('gridForm.gridFormDirective', [])

    .directive('gridForm', ['$cbResource', '$location', 'gridManager',

        function ($cbResource, $location, gridManager) {

            return {

                scope: {
                    gridForm: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/partials/grid-form-directive-tpl.html',

                controller: function ($scope) {
                    console.log("testing");

                    this.gridForm = $scope.gridForm;



                    var init = function () {

                        $scope.dumpDataModel = function () {
                            console.log($scope.gridForm.rows);
                        }

                        console.log("doing the init portion of the work right now");
                        $scope.genders = ['test1', 'test2', 'test3', 'test4'];

                    };

                    init();

                }

            };

        }

    ])
;
