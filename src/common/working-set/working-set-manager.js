/*
        There is some code in here which should really be moved to the crowelab section of this -- individual implementation specific code does not belong in common ...

        Background on buttons and actions
            // Text -- What should be displayed on this button?
            // Type -- Text, Dropdown
            // Action -- The function that should be called
            // Action List -- If you are using a dropdown this will add support
                // Actions should all take a list of samples as an argument. The directive which uses this service should automatically get the list of selected samples and call a given function on that sample when an option is clicked.
                // Actions should return boolen values to indicate whether or not the action was successful.

            // Button example
            // buttons: [
            //     {
            //         "text": "text",
            //         "type": "button",
            //         "action": function() {

            //         },
            //         "dropdownActions": [{
            //             "text": "text",
            //             "action": function () {

            //             }
            //         }]
            //     }
            // ],


        // Long term we should move towards data being a map to arrays for the various types of objects that could be held in a working set.


        // Still need to make it so that the user can provide a refresh url for each of the types of enties that are provided.
*/

angular.module('workingSet.workingSetManager', [])
    .service('workingSetManager', ['sessionFactory', '$cbResource', '$injector',

        function (sessionFactory, $cbResource, $injector) {

            // "Samples", "Storage Divisions", "Requests"
            // "Samples"
            // Add the top button in at some point

            var workingSetManager = {

                sets: [],

                setMetadata: {},

                selectedSet: "",

                // We can move loading into the setMetadata object instead of keeping it here
                // loading: {},

                // Migt not even need this -- working set is in a modal now and there is a selected set which is sidplaye dinstead of having a single collapsed variable.
                collapsed: true,

                // data: {},

                // ids: {},

                buttons: {},

                addWorkingSet: function (name, setButtons, setMetadata) {

                    // append name to sets.
                    // if there is not a currently selected set then you should select it.

                    // workingSetManager.sets.push(name);
                    // workingSetManager.data[name] = [];
                    // workingSetManager.ids[name] = [];
                    // workingSetManager.loading[name] = false;

                    workingSetManager.setMetadata[name] = setMetadata;
                    workingSetManager.setMetadata[name]['loading'] = false;
                    workingSetManager.setMetadata[name]['ids'] = [];
                    workingSetManager.setMetadata[name]['data'] = [];
                    workingSetManager.setMetadata[name]['buttons'] = setButtons;

                    if (workingSetManager.selectedSet == "") {
                        workingSetManager.changeSelectedSet(name);
                        // workingSetManager.selectedSet = name;
                    }

                    // workingSetManager.buttons[name] = setButtons; // This will change since we will be moving to using a map in the near future.
                    workingSetManager.buildSetsList();
                    workingSetManager.refresh();
                },

                buildSetsList: function() {
                    workingSetManager.sets = Object.keys(workingSetManager.setMetadata);
                    return workingSetManager.sets;
                },


                // Add a new button action to the group of buttons -- there is a common set of buttons but cetain implementations may want to have more functionality which is not in common.
                // We might not even support this if we are going to be able to add all of the buttons for a given type of working set within a single operation.
                addButtonAction: function () {
                    console.log('workingSetManager: add button action is not currently implemented');
                },

                // Should work
                recomputeIds: function (set = "Samples") {
                    workingSetManager.setMetadata[set].ids = workingSetManager.setMetadata[set].data.map( function (entry) {
                        return entry.id;
                    });
                },

                // Should work
                getSelected: function(set = "Samples"){
                    return workingSetManager.setMetadata[set].data.filter( function (entry) {
                        return (entry.selected == true);
                    });
                },

                // Should work
                deselectAll: function(set = 'Samples') {
                    workingSetManager.setMetadata[set].data = workingSetManager[set].data.map(function(entity){
                        entity.selected = false;
                        return entity;
                    });
                },

                // Should work
                selectAll: function(set = "Samples") {
                    workingSetManager.setMetadata[set].data = workingSetManager.setMetadata[set].data.map(function (entity) {
                        entity.selected = true;
                        return entity;
                    });
                },

                // Needs changes
                handleReponse: function (response, set="Samples"){
                    workingSetManager.setMetadata[set].loading = false;
                },

                // I don't think that this will be needed in the final version after all.
                ngOnInit: function () {
                    console.log("init");
                },

                // Needs changes
                refresh: function () {

                    if (this.loading == true){
                        return;
                    }
                    this.loading = true;

                    $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {

                        var resData = response['data'];
                        var scopeData = workingSetManager.setMetadata['Samples'].data;

                        if (scopeData.length > 0 && resData.length > 0) {

                            var scopeDataIds = scopeData.map(function (entry) {
                                return entry.id;
                            });

                            var resDataIds = resData.map(function (entry) {
                                return entry.id;
                            });

                            scopeData = scopeData.filter(function (entry) {
                                return resDataIds.indexOf(entry.id) != -1;
                            });

                            resData = resData.filter(function (entry) {
                                return scopeDataIds.indexOf(entry.id) == -1;
                            });
                        }

                        if (resData.length > 0) {
                            resData = resData.map(function (entry) {
                                entry.selected = false;
                                return entry;
                            });
                        }

                        workingSetManager.setMetadata['Samples'].data = scopeData.concat(resData);
                        workingSetManager.setMetadata['Samples'].loading = false;

                        workingSetManager.recomputeIds();
                        return;

                    });
                },

                // This might not really be needed if all that initialize is going to do is refresh it...
                initialize: function () {
                    workingSetManager.refresh();
                },

                // Needs changes
                addSample: function (entry) {

                    var set = 'Samples'; // This will be changed in the final version of this -- not sure if we will be passing it in or if we will just be using the currently selected set or exactly how that will work but we will need to decide upon something.

                    // We should really be registering a callback here which would check to see if the operation was successful -- this could lead the interface to think that things were stored in their working set when they actually were not.
                    $cbResource.create('/storage/working-set-add-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});

                    entry.selected = false;
                    //workingSetManager.data['Samples'].push(entry);
                    workingSetManager[set].data.push(entry);
                    workingSetManager.recomputeIds();

                },

                // Needs changes
                removeSample: function (entry) {

                    // We should really check the outcome of this call before we do anything to the actual array
                    $cbResource.delete('/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});

                    workingSetManager.data = workingSetManager.data.filter( function (item) {
                        return item.id != entry.id;
                    });

                    workingSetManager.recomputeIds();

                },

                // Should be good to go
                changeSelectedSet: function (setToSelect){
                    workingSetManager.selectedSet = setToSelect;
                }

            };

            // We should not need to call this function... I didn't even bother to define it..
            // This is all going to be moved into a crowelab specific area at some point.

            var sampleButtons = [
                    {
                        "text": "Remove from set",
                        "type": "button",
                        "action": function () {
                            console.log("Removing from set");
                            angular.forEach(workingSetManager.getSelected(), function (entry){
                                workingSetManager.removeSample(entry);
                            })
                        }
                    },
                    {
                        "text": "Deplete",
                        "type": "button",
                        "action": function () {
                            console.log("depleting this sample");
                        }
                    },
                    {
                        "text": "Excel Export",
                        "type": "button",
                        "action": function () {
                            console.log("Excel Export");
                        }
                    },
                    {
                        "text": "Add Attachment",
                        "type": "button",
                        "action": function () {
                            console.log("Add attachment");
                        }
                    },
                    {
                        "text": "Start Request",
                        "type": "dropdown",
                        "action:": function () {
                            console.log("Start Request");
                        },
                        "dropdownActionsText": "['Human Specimen', 'PBMC', 'DNA Purification', 'Protein Expression', 'Protein / Hybridoma Purification', 'Outgoing VIM']",
                        "dropdownActions":
                        [

                            {
                                "text": 'PBMC',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('pbmcFormFactory');
                                    return factory.openFormModal(undefined, workingSetManager.getSelected());
                                }
                            },
                            {
                                "text": 'DNA Purification',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('dnaFormFactory');
                                    return factory.openFormModal(undefined, workingSetManager.getSelected());
                                }
                            },
                            {
                                "text": 'Protein Expression',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('proteinExpressionFormFactory');
                                    return factory.openFormModal(undefined, workingSetManager.getSelected());
                                }
                            },
                            {
                                "text": 'Protein / Hybridoma Purification',
                                "service": undefined,
                                "type": "dropdownItem",
                                "action": function () {
                                    var factory = $injector.get('proteinPurificationFormFactory');
                                    return factory.openFormModal(undefined, workingSetManager.getSelected());
                                }
                            },
                            {
                                "text": 'Outgoing VIM',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('vimFormFactory');
                                    return factory.openFormModal(undefined, workingSetManager.getSelected());
                                }
                            }
                        ]
                    }
                ];

            var metadata = {'refresh':'/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, 'add': '/storage/working-set-add-id/' + sessionFactory.getLoggedInUser().id + '/', 'remove': '/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id + '/'};

            // '/storage/working-set-sample/user/'
            // '/storage/working-set-add-id/'
            // '/storage/working-set-remove-id/'

            workingSetManager.addWorkingSet("Samples", sampleButtons, metadata);

            // workingSetManager.refresh();
            // We refresh it at the end of adding buttons so we do not need to refresh it here.

            // console.log(Array.from(workingSetManager.buttons.keys));

            // This is how we get keys -- we can have an object that stores all of the urls for the types of requests that we use to create and manage a working set.

            console.log(Object.keys(workingSetManager.buttons));

            // console.log(workingSetManager);
            return workingSetManager;

        }
    ])
;
