angular.module('workingSet.workingSetManager', [])

    .service('workingSetManager', ['sessionFactory', '$cbResource',

        function (sessionFactory, $cbResource) {

            var workingSetManager = {

                loading: false,

                collapsed: true,

                data: [{'id': 1}],

                // Text -- What should be displayed on this button?
                // Type -- Text, Dropdown
                // Action -- The function that should be called
                // Action List -- If you are using a dropdown this will add support
                    // Actions should all take a list of samples as an argument. The directive which uses this service should automatically get the list of selected samples and call a given function on that sample when an option is clicked.


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

                buttons: [
                    {
                        "text": "Remove from set",
                        "type": "button",
                        "action": function () {
                            console.log("Removing from set");
                        }
                    }
                    ,
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
                        "dropdownActions":
                        [
                            {
                                "name": 'Human Specimen',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 1");
                                }
                            },
                            {
                                "name": 'PBMC',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 2");
                                }
                            },
                            {
                                "name": 'DNA Purification',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 3");
                                }
                            },
                            {
                                "name": 'Protein Expression',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 4");
                                }
                            },
                            {
                                "name": 'Protein / Hybridoma Purification',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 5");
                                }
                            },
                            {
                                "name": 'Outgoing VIM',
                                "type": "dropdownItem",
                                "action": function () {
                                    console.log("action 6");
                                }
                            }
                        ]
                    }
                ],


                // Add a new button action to the group of buttons -- there is a common set of buttons but cetain implementations may want to have more functionality which is not in common.
                addButtonAction: function () {

                },

                getSelected: function(){

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
                        return;

                    });

                },

                initialize: function () {
                    this.refresh();
                },

                createRequest: function () {
                    console.log("create request");
                },

                addSample: function () {
                    console.log("add sample");

                }

            };

            workingSetManager.refresh();

            return workingSetManager;

        }
    ])
;
