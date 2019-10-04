/*

    This class is going to be used in order to build grid forms and populate them with the initial data -- much like the grid builder does with grids.

*/

angular.module('gridForm.$cbGridFormBuilder', [])
    .service('$cbGridFormBuilder', [ '$injector', '$cbResource', '$q', 'gridFormFactory',
        function ($injector, $cbResource, $q, gridFormFactory) {

            var gridFormBuilder = {


                /*

                    Arguments:
                        entityDetailId for the type of entity that you are dealing with
                        overrides -- not built yet for specialty overrrides

                    Return Values:

                */
                buildCreate: function (entityDetailId, overrides = {})
                {

                    var gridForm = gridFormFactory.create();

                    return gridForm;

                },


                /*
                    Arguments:
                        entityDetailId: for the type of entity that you are dealing with
                        idList: list of ids
                        overrides: not implemented yet

                    Return Values:

                */
                buildUpdate: function(entityDetailId, idList, overrides = {})
                {

                    var gridForm = gridFormFactory.create();

                    return gridForm;

                },


                /*
                    Arguments:
                        entityDetailId:
                        requestId:
                        overrides: not implemented yet

                    Return Values:

                */
                // This has not been built yet.
                buildProductionRequestInputs: function(entityDetailId, requestId, overrides = {})
                {

                    var url = 'production/download-input-template';

                    var obj = {};
                    obj.totalOutputSamples = 2;
                    obj.inputTemplateType = 'GRIDFORM';
                    obj.entity = "AppBundle\\Entity\\Production\\HumanSpecimen\\Request";
                    obj.outputSampleDefaults = {"catalog":"D1752 HS0819-6","description":"Donor 1752 - Copperhead Snake Bite- Donor 1752","sampleType":"Blood","status":"Available","storageContainer":"Vial","target":180,"lot":"HS0819-6","donor":1752,"division":2833,"projectSamples":""};
                    obj.hasVaryingOutputSampleTypes = false;
                    obj.id = 945;


                    // var requestId

                    // Entity = path to entity
                    // Output Sample Defaults = ...

                    var gridForm = gridFormFactory.create();


                    // var thing = $cbResource.create(url, obj);

                    /*
                        $cbResource ... . then ...


                    */

                    $cbResource.create(url,obj).then(function (response) {

                        //gridForm.changeStuff ...

                    });




                    return gridForm;

                },

                /*
                    Arguments:
                        entityDetailId:
                        requestId:
                        overrides: not implemented yet

                    Return Value:

                */
                buildProductionRequestOutputs: function(entityDetailId, requestId, overrides = {})
                {

                    var url = '/production/download-output-template';

                    var obj = {};
                    obj.totalOutputSamples = 2;
                    obj.outputTemplateType = 'GRIDFORM';
                    obj.entity = "AppBundle\\Entity\\Production\\HumanSpecimen\\Request";
                    obj.outputSampleDefaults = {"catalog":"D1752 HS0819-6","description":"Donor 1752 - Copperhead Snake Bite- Donor 1752","sampleType":"Blood","status":"Available","storageContainer":"Vial","target":180,"lot":"HS0819-6","donor":1752,"division":2833,"projectSamples":""};
                    obj.hasVaryingOutputSampleTypes = false;
                    obj.id = 945;

                    // Entity = path to entity
                    // Output Sample Defaults = ...

                    var gridForm = gridFormFactory.create();

                    $cbResource.create(url, obj).then( function (response) {

                        // gridForm.changeStuff...

                        gridForm.clearRows(); // This is going to be removed -- this is just because there is sample data built in already
                        gridForm.setColumns(response.data.headers);
                        gridForm.addRowsFromObjects(response.data.content);
                        console.log("columns:", response.data.headers);
                        console.log("content:", response.data.content);


                        // gridForm.setCreateNew(true);
                        // gridForm.set

                        // return response.data;
                        // return gridForm;
                    });

                    return gridForm;

                },

                /*
                    Arguments:
                        entityDetailId:
                        // Populated from the user that submits the request
                        overrides: not implemented yet

                    Return Value:

                */
                buildWorkingSetGridForm: function(entityDetailId, overrides = {})
                {

                    var gridForm = gridFormFactory.create();

                    return gridForm;

                }

            };
            return gridFormBuilder
        }
    ])
;
