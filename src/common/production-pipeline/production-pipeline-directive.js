angular.module('productionPipeline.productionPipelineDirective', [])

    .directive('productionPipeline', ['productionPipelineFactory',

        function (productionPipelineFactory) {

            return {

                scope: {
                    config: '='
                },

                restrict: 'E',

                templateUrl: 'common/production-pipeline/partials/production-pipeline-directive-tpl.html',

                controller: function ($scope) {

                }

            };

        }

    ])
;
