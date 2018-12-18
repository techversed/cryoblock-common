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

                selectedSet: "",

                loading: {},

                // false,


                // Migt not even need this -- working set is in a modal now and there is a selected set which is sidplaye dinstead of having a single collapsed variable.
                collapsed: true,

                data: {},

                ids: {},

                buttons: {},

                addWorkingSet: function (name, setButtons) {

                    // append name to sets.
                    // if there is not a currently selected set then you should select it.

                    workingSetManager.sets.push(name);
                    workingSetManager.data[name] = [];
                    workingSetManager.ids[name] = [];
                    workingSetManager.loading[name] = false;

                    if (workingSetManager.selectedSet == "") {
                        workingSetManager.changeSelectedSet(name);
                        // workingSetManager.selectedSet = name;
                    }

                    workingSetManager.buttons[name] = setButtons; // This will change since we will be moving to using a map in the near future.
                },

                // Add a new button action to the group of buttons -- there is a common set of buttons but cetain implementations may want to have more functionality which is not in common.
                // We might not even support this if we are going to be able to add all of the buttons for a given type of working set within a single operation.
                addButtonAction: function () {
                    console.log('workingSetManager: add button action is not currently implemented');
                },

                recomputeIds: function (set = "Samples") {
                    this.ids[set] = this.data[set].map( function (entry) {
                        return entry.id;
                    });
                },

                // This will need to be changed
                getSelected: function(set = "Samples"){
                    return workingSetManager.data[set].filter( function (entry) {
                        return (entry.selected == true);
                    });
                },

                // This will need to be changed.
                deselectAll: function(set = 'Samples') {
                    this.data[set] = this.data[set].map(function(entity){
                        entity.selected = false;
                        return entity;
                    });
                },

                // This will need to be changed
                selectAll: function(set = "Samples") {
                    this.data[set] = this.data[set].map(function(entity){
                        entity.selected = true;
                        return entity;
                    });
                },

                handleReponse: function (response){
                    this.loading = false;
                },

                ngOnInit: function () {
                    console.log("init");
                },

                refresh: function () {

                    if (this.loading == true){
                        return;
                    }
                    this.loading = true;

                    $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {

                        var resData = response['data'];
                        var scopeData = workingSetManager.data['Samples'];

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

                        workingSetManager.data['Samples'] = scopeData.concat(resData);
                        workingSetManager.loading = false;

                        workingSetManager.recomputeIds();
                        return;

                    });
                },

                initialize: function () {
                    this.refresh();
                },

                addSample: function (entry) {

                    // We should really be registering a callback here which would check to see if the operation was successful -- this could lead the interface to think that things were stored in their working set when they actually were not.
                    $cbResource.create('/storage/working-set-add-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});

                    entry.selected = false;
                    workingSetManager.data['Samples'].push(entry);
                    workingSetManager.recomputeIds();

                },

                // This should be changed to be generic so that it can remove an entity from any type of working set.
                removeSample: function (entry) {

                    // We should really check the outcome of this call before we do anything to the actual array
                    $cbResource.delete('/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});

                    workingSetManager.data = workingSetManager.data.filter( function (item) {
                        return item.id != entry.id;
                    });

                    workingSetManager.recomputeIds();

                },

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

            workingSetManager.addWorkingSet("Samples", sampleButtons);

            workingSetManager.refresh();

            console.log(workingSetManager);
            return workingSetManager;

        }
    ])
;
