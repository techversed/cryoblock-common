/*


*/
angular.module('productionPipeline.productionPipelineStepFactory', [])

    .factory('productionPipelineStepFactory', [

        function () {

            var productionPipelineStepFactory = function (defaults) {

                this.types = {
                    'inputSamples': {},
                    'outputSamples': {}
                };

                this.type = null;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            productionPipelineStepFactory.prototype = {

            };

            productionPipelineStepFactory.create = function (defaults) {

                    return new productionPipelineStepFactory();

            };

            return productionPipelineStepFactory;

        }

    ])
;


