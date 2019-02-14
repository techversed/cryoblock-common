angular.module('gridForm.gridFormDirective', [])

    .directive('gridForm', ['$cbResource', '$location',

        function ($cbResource, $location) {

            return {

                require: ['?^gridForm', 'ngModel'],

                scope: {
                    gridForm: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/partials/grid-form-directive-tpl.html',

                controller: function ($scope) {

                    this.gridForm = $scope.gridForm;

                    var init = function () {

                        $scope.dumpDataModel = function () {
                            console.log(this.gridForm);
                            console.log($scope.gridForm.rows);
                        }

                    };

                    init();

                }

            };

        }

    ])
;
