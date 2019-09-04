/*

    This class is going to be used in order to build grid forms and populate them with the initial data -- much like the grid builder does with grids.

*/

angular.module('gridForm.gridFormBuilder', [])
    .service('$cbGridFormBuilder', [ '$injector', '$cbResource', '$q',
        function ($injector, $cbResource, $q) {

            var gridFormBuilder = {

                /*
                    Arguments:
                        entityDetailId for the type of entity that you are dealing with
                        overrides -- not built yet for specialty overrrides

                    Return Values:

                */
                buildCreate: function (entityDetailId, overrides = {}) {

                    gridform = {};

                    return gridform;

                },

                /*
                    Arguments:
                        entityDetailId: for the type of entity that you are dealing with
                        idList: list of ids
                        overrides: not implemented yet

                    Return Values:

                */
                buildUpdate: function(entityDetailId, idList, overrides = {}){

                    gridform = {};

                    return gridform;

                },

                /*
                    Arguments:
                        entityDetailId:
                        requestId:
                        overrides: not implemented yet

                    Return Values:

                */
                buildProductionRequestInputs: function(entityDetailId, requestId, overrides = {}){

                    gridform = {};

                    return gridform;

                },

                /*
                    Arguments:
                        entityDetailId:
                        requestId:
                        overrides: not implemented yet

                    Return Value:

                */
                buildProductionRequestOutputs: function(entityDetailId, requestId, overrides = {}){

                    gridform = {};

                    return gridform;

                },

                /*
                    Arguments:
                        entityDetailId:
                        // Populated from the user that submits the request
                        overrides: not implemented yet

                    Return Value:

                */
                buildWorkingSetGridForm: function(entityDetailId, overrides = {}){

                    gridform = {};

                    return gridform;

                }

            };
            return gridFormBuilder
        }
    ])
;
