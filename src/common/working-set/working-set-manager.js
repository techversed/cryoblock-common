angular.module('workingSet.workingSetManager', [])

    /*

        There is some code in here which should really be moved to the crowelab section of this -- individual implementation specific code does not belong in common ...

    */

    .service('workingSetManager', ['sessionFactory', '$cbResource', '$injector',

        function (sessionFactory, $cbResource, $injector) {

            var workingSetManager = {

                loading: false,

                collapsed: true,

                // Long term we should move towards data being a map to arrays for the various types of objects that could be held in a working set.
                data: [],

                ids: [],

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

                // Add the top button in at some point
                buttons: [

                    // {
                    //     "text": "Remove from set",
                    //     "type": "button",

                    //     "action": function () {
                    //         var formFactory = $injector.get('sampleFormFactory');
                    //         formFactory.openSampleFormModal();
                    //         console.log("Removing from set");
                    //     }
                    // },


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
                            // HS request has no input samples
                            // {
                            //     "text": 'Human Specimen',
                            //     "type": "dropdownItem",
                            //     "factory": null,
                            //     "getFactory": function () {
                            //         return $injector.get('humanSpecimenFormFactory');
                            //     },
                            //     "action": function () {
                            //         var factory = $injector.get('humanSpecimenFormFactory');
                            //         return factory.openFormModal();
                            //     }
                            // },
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
                                    return factory.openFormModal();
                                }
                            },
                            {
                                "text": 'Protein Expression',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('proteinExpressionFormFactory');
                                    return factory.openFormModal();
                                }
                            },
                            {
                                "text": 'Protein / Hybridoma Purification',
                                "service": undefined,
                                "type": "dropdownItem",
                                "action": function () {
                                    var factory = $injector.get('proteinPurificationFormFactory');
                                    return factory.openFormModal();
                                }
                            },
                            {
                                "text": 'Outgoing VIM',
                                "type": "dropdownItem",
                                "service": undefined,
                                "action": function () {
                                    var factory = $injector.get('vimFormFactory');
                                    return factory.openFormModal();
                                }
                            }
                        ]
                    }
                ],

                // Add a new button action to the group of buttons -- there is a common set of buttons but cetain implementations may want to have more functionality which is not in common.
                addButtonAction: function () {

                },

                recomputeIds: function () {

                    this.ids = this.data.map( function (entry) {
                        return entry.id;
                    });

                },

                getSelected: function(entry){
                    return workingSetManager.data.filter( function (entry) {
                        return (entry.selected == true);
                    });
                },

                deselectAll: function() {
                    this.data = this.data.map(function(entity){
                        entity.selected = false;
                        return entity;
                    });
                },

                selectAll: function() {
                    this.data = this.data.map(function(entity){
                        entity.selected = true;
                        return entity;
                    });
                },

                handleReponse: function (response){
                    console.log(this.data);
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
                        var scopeData = workingSetManager.data;

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

                        workingSetManager.data = scopeData.concat(resData);
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
                    workingSetManager.data.push(entry);
                    workingSetManager.recomputeIds();

                },

                // Add a remove function
                removeSample: function (entry) {

                    // We should really check the outcome of this call before we do anything to the actual array
                    $cbResource.delete('/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});

                    workingSetManager.data = workingSetManager.data.filter( function (item) {
                        return item.id != entry.id;
                    });

                    workingSetManager.recomputeIds();
                }

            };

            workingSetManager.initialize();

            return workingSetManager;

        }
    ])
;
