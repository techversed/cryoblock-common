/*

        Working set manager - This service is fetched by every element which makes use of working set and ensures that selections are held constant in every representation of the working set which is present in the interface.
        Allows for the working set to be added and removed from from varous contexts while ensuring that theere is a centralized source of truth for all of them.


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
    .service('workingSetManager', ['sessionFactory', '$cbResource', '$injector', "$window", "API", "$localStorage",
        function (sessionFactory, $cbResource, $injector, $window, API, $localStorage) {

            var workingSetManager = {

                sets: [],
                setMetadata: {},
                selectedSet: "",
                collapsed: true,

                toggleCollapse: function () {

                    workingSetManager.collapsed = workingSetManager.collapsed ? false : true;

                },

                addWorkingSet: function (name, setButtons, setMetadata) {

                    workingSetManager.setMetadata[name] = setMetadata;
                    workingSetManager.setMetadata[name]['loading'] = false;
                    workingSetManager.setMetadata[name]['ids'] = [];
                    workingSetManager.setMetadata[name]['data'] = [];
                    workingSetManager.setMetadata[name]['buttons'] = setButtons;

                    if (workingSetManager.selectedSet == "") {
                        workingSetManager.changeSelectedSet(name);
                    }

                    workingSetManager.buildSetsList();
                    workingSetManager.refresh(); // Uncomment this once the multi-request issue is figured out.
                },

                buildSetsList: function() {
                    workingSetManager.sets = Object.keys(workingSetManager.setMetadata);
                    return workingSetManager.sets;
                },

                addButtonAction: function () {
                    console.log('workingSetManager: add button action is not currently implemented');
                },

                recomputeIds: function (set = "Samples") {
                    workingSetManager.setMetadata[set].ids = workingSetManager.setMetadata[set].data.map( function (entry) {
                        return entry.id;
                    });
                },

                getSelected: function(set = "Samples"){
                    return workingSetManager.setMetadata[set].data.filter( function (entry) {
                        return (entry.selected == true);
                    });
                },

                deselectAll: function() {
                    var selectedSet = workingSetManager.selectedSet;
                    workingSetManager.setMetadata[selectedSet].data = workingSetManager.setMetadata[selectedSet].data.map(function (entity) {
                        entity.selected = false;
                        return entity;
                    });
                },

                selectAll: function() {
                    var selectedSet = workingSetManager.selectedSet;
                    workingSetManager.setMetadata[selectedSet].data = workingSetManager.setMetadata[selectedSet].data.map(function (entity) {
                        entity.selected = true;
                        return entity;
                    });
                },

                removeSample: function () {

                    var changeList = {};
                    changeList.delete = workingSetManager.getSelected("Samples");

                    var test = $cbResource.update('/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id, changeList, {}).then(function(response){

                            var resData = response['data'];
                            var scopeData = workingSetManager.setMetadata[set].data;

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

                            workingSetManager.setMetadata[set].data = scopeData.concat(resData);
                            workingSetManager.setMetadata[set].loading = false;
                            workingSetManager.recomputeIds();
                            return;
                        // workingSetManager.refresh();

                    });
                    // console.log(test);
                    

                },

                // don't even need this after the refactor
                handleReponse: function (response, set="Samples"){
                    workingSetManager.setMetadata[set].loading = false;
                },

                // I don't think that this will be needed in the final version after all.
                ngOnInit: function () {
                    console.log("init");
                },

                // This still needs to be changed to be more generic
                refresh: function () {

                    angular.forEach(workingSetManager.sets, function (set) {

                        if (workingSetManager.setMetadata[set]['loading'] == true){
                            return;
                        }

                        workingSetManager.setMetadata[set]['loading'] = true;

                        $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {

                            var resData = response['data'];
                            var scopeData = workingSetManager.setMetadata[set].data;

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

                            workingSetManager.setMetadata[set].data = scopeData.concat(resData);
                            workingSetManager.setMetadata[set].loading = false;
                            workingSetManager.recomputeIds();
                            return;
                        });
                    });
                },

                // This might not really be needed if all that initialize is going to do is refresh it...
                initialize: function () {
                    workingSetManager.refresh();
                },

                addItem: function (set = "", entry) {

                    if (set == "") {
                        set = workingSetManager.selectedSet;
                    }

                    $cbResource.create(workingSetManager.setMetadata[set]['add']+entry.id, {});

                    entry.selected = false;

                    workingSetManager.setMetadata[set].data.push(entry);
                    workingSetManager.recomputeIds();
                },

                removeItem: function (set = "", entry) {

                    if (set = "") {
                        set = workingSetManager.selectedSet;
                    }

                    // We should really check the outcome of this call before we do anything to the actual array
                    // $cbResource.delete('/storage/working-set-remove-id/' + sessionFactory.getLoggedInUser().id + '/' + entry.id, {});
                    $cbResource.delete(workingSetManager.setMetadata[set]['remove'] + entry.id, {});

                    workingSetManager.setMetadata[set].data = workingSetManager.setMetadata[set].data.filter( function (item) {
                        return item.id != entry.id;
                    });

                    workingSetManager.recomputeIds();

                },

                // Should be good to go
                changeSelectedSet: function (setToSelect){
                    workingSetManager.selectedSet = setToSelect;
                }

            };

            // This will be moved outside of common going forwards
            var sampleButtons = [
                {
                    "text": "Remove from set",
                    "type": "button",
                    "action": function () {
                        console.log("Removing from set");
                        angular.forEach(workingSetManager.getSelected(), function (entry){
                            workingSetManager.removeSample(entry);
                        });
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

                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', API.url + '/storage/working-set-bulk/excelDownload' , true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.setRequestHeader('X_FILENAME', 'Input Samples Template.xlsx');
                        xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                        xhr.responseType = 'blob';

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {

                                    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                    var blob = new Blob([xhr.response], { type: contentType });

                                    var windowUrl = window.URL || window.webkitURL;
                                    var url = windowUrl.createObjectURL(blob);
                                    var filename = 'WorkingSetDownload.xlsx';
                                    var a = document.createElement('a');

                                    a.href = url;
                                    a.download = filename;
                                    a.click();
                                    window.URL.revokeObjectURL(url);

                                } else {
                                    // observer.error(xhr.response);
                                }
                            }
                        };

                        xhr.send();

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

            workingSetManager.addWorkingSet("Samples", sampleButtons, metadata);


            workingSetManager.refresh();

            return workingSetManager;

        }
    ])
;
