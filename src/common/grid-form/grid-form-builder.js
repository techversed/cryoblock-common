/*

    This class is going to be used in order to build grid forms and populate them with the initial data -- much like the grid builder does with grids.

*/

angular.module('grid.gridBuilder', [])
    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location', '$q', 'gridManager',
        function ($injector, $cbResource, $location, $q, gridManager) {

            var gridBuilder = {

                buildCreate: function (entityDetailId, overrides = {}) {
                    gridform = {};

                    return gridform;

                },

                buildUpdate: function(entityDetailId, idList, overrides = {}){


                    return gridform;
                },

                buildProductionRequestInputs: function(entityDetailId, requestId, overrides = {}){


                    return gridform;
                },

                buildProductionRequestOutputs: function(entityDetailId, requestId, overrides = {}){

                    return gridform;
                },

                buildWorkingSetGridForm: function(entityDetailId, overrides = {}){

                    return gridform;
                }

            };
            return gridBuilder
        }
    ])
;
