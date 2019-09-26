/*

    This class implements a new directive type called a "Grid Form" which, as the name implies is essentially an amalgamation of the "Grid" and "Form" classes.
    The purpose of this object type is to make it possible to handle bulk actions across a number of entities without resorting to using an Excel spreadsheet.
    This allows us to finally support sample-type dropdowns since lists in excel are limited to allowing for 256 characters worth of elements in a single dropdown menu...

    This is also going to make it possible to handle a series of actions in the gene-synthesis and sequencing apps which is confusing and unclean in the current excel download/upload setup.

*/

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
                            // console.log(this.gridForm);
                        }

                    };

                    init();

                }

            };

        }

    ])
;
