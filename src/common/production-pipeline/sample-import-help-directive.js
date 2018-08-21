angular.module('productionPipeline.sampleImportHelpDirective', [])

    .directive('sampleImportHelp', [

        function () {

            return {

                scope: {
                    config: '='
                },

                restrict: 'E',

                templateUrl: 'common/production-pipeline/partials/sample-import-help-tpl.html',

                controller: function ($scope) {

                }

            };

        }

    ])
;
