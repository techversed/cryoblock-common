angular.module('grid.gridBuilder', [])
    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location', '$q', 'gridManager',
        function ($injector, $cbResource, $location, $q, gridManager) {

            var gridBuilder = {

                // Build the grid for an index page.
                // Possible overrides:
                    // url -- specify a url that is used instead of the one included in the grid factory - Can be useful when you want to use the same grid factory but you want to use an address to a relation's controller instead of the controller for an entity.
                    // filterGroups -- lets you specify filters to add directly to the grid.
                    // bindToState -- can be used to turn off the bindToState property if not provided bindToState will default to true.
                    // filtersClearable
                buildIndex: function (factoryName, overrides = {}) {

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    if (factory.url === undefined) {
                        throw Error('No url property found on grid ' + factoryName);
                    }

                    var url = overrides.url != undefined ? overrides.url : factory.url;

                    grid
                        .setActionTemplate(factory.actionTemplate)
                        .setResourceUrl(url)
                        .setBindToState(overrides.bindToState != undefined ? overrides.bindToState : true)
                    ;

                    grid.perPageOptions = [25, 50, 100];
                    grid.setPerPage(grid.perPageOptions[0]);
                    grid = this.addFiltersToGrid(grid, overrides['filterGroups']);

                    // var defaultParams = { cOrderBy: grid.sortingColumn.name, cOrderByDirection: grid.sortDirection};
                    // We are going to try this out...

                    var defaultParams = grid.getRequestParams();
                    var params = gridManager.ignoreUrlParams ? defaultParams : angular.extend(defaultParams, $location.search());

                    $cbResource.get(url, params).then(function (response) {
                        grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .setInitResultCount(response.unpaginatedTotal)
                        ;
                    });

                    return grid;

                },

                // Build a grid using a grid factory using a linker table. Find the entities that are linked with the specified one

                // Available overrides
                    // otmPostpend -- allows you to specify text that will be added to the end of the url that is used to build the otm grid
                    // selectPostpend -- allows you to specify text taht will be added to the end of the url that is used to build the select grid.
                    // selectFilterGroups -- allows you to pass a list of filters that are autoenabled in the form [[filter1: value1], [filter2: value2], [filter3:value3]]
                    // not yet implemented -- otmFilterGroups -- might not even implement this.
                buildMTMGrids: function (url, factoryName, initObject, isEditable, overrides = {}) {

                    var otmPostpend = overrides.otmPostpend ? overrides.selectPostpend : "";
                    var selectPostpend = overrides.selectPostpend ? overrides.selectPostpend : "";
                    var selectFilterGroups = overrides.selectFilterGroups ? overrides.selectFilterGroups : {};

                    promises = []
                    promises.push(this.buildOTM(url, factoryName, initObject, isEditable, {postpend : otmPostpend}));
                    promises.push(this.buildSelect(url, factoryName, initObject, undefined, {postpend : selectPostpend, filterGroups : selectFilterGroups}));

                    return $q.all(promises);

                },

                //Possible overrides
                    //postpend -- a string that will be added to the end of the url that is passed in.
                    //filterGroups -- currently only takes filters of type string.
                buildSelect: function (url, factoryName, initObject, single, overrides = {}) {

                    var postpend = overrides.postpend ? overrides.postpend : "";
                    var factory = $injector.get(factoryName);
                    var grid = factory.create();

                    url = (initObject && initObject.id) ? url + initObject.id + postpend : url + 0 + postpend;

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelectMany();
                    grid.perPageOptions = [5, 15, 25];
                    grid.setPerPage(grid.perPageOptions[0]);
                    grid = this.addFiltersToGrid(grid, overrides['filterGroups']);

                    // var defaultParams = {cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    var defaultParams = grid.getRequestParams();
                    // We are going to try this out...

                    if (single === undefined) {
                        grid.setStaticFilters({'cSelectable' : true});
                        defaultParams['cSelectable'] = true;
                    }

                    return $cbResource.get(url, defaultParams).then(function (response) {
                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .disableHyperlinks()
                            .disableHover()
                            .disableToggleColumns()
                            .setInitResultCount(response.unpaginatedTotal)
                        ;
                    });
                },

                // Helper function used to implement the overrrides for the various other grid functions -- not intended to be called directly
                    // Currently there
                addFiltersToGrid: function (grid, filterOverride = {}) {
                    if (filterOverride != {} && filterOverride != undefined) {
                        var filterObjIndex;
                        var filterObjectKeys = Object.keys(filterOverride);

                        angular.forEach(grid.filters, function (filter) {
                            filterObjIndex = filterObjectKeys.indexOf(filter.title); //need to use title instead of bind to because there can be multiple realtions bound to the same field on different objects.
                            if(filterObjIndex != -1){
                                filter.disabled = true;
                                filter.isVisible = true;
                                filter.isFiltering = true;

                                switch(filter.type){
                                    case "relation":
                                        angular.forEach( filterOverride[filterObjectKeys[filterObjIndex]], function (selectedRelation) {
                                            filter.selectItem(selectedRelation);
                                        });
                                        break;

                                    case "enum":
                                        angular.forEach( filterOverride[filterObjectKeys[filterObjIndex]], function (element) {

                                            filter.selectItem(element);
                                            filter.updateSelectionString();

                                        });

                                        // filter.selectedItems.push(filterObjectKeys[filterObjIndex][0]);
                                        // filter.selectionString = filterOverride[filterObjectKeys[filterObjIndex]][0];
                                        break;

                                    case "boolean":
                                        filter.form = {
                                        };
                                        filter.setModel(filterOverride[filterObjectKeys[filterObjIndex]]);
                                        break;

                                    // These are curerntly the only filters that we need but we can implement the other types as they are required.
                                }
                            }
                        });
                    }
                    return grid;
                },

                // Build a grid for use with forms that allows the user to select one option

                // Possible overrides
                    // url -- if you would like to use an alternate url post it here.
                    // filterGroups -- List the filters that will be applied by default.
                    // filterParams -- object {key: value} will be joined with default params to create the initial search string...
                buildSelectSingle: function (factoryName, overrides = {}) {

                    var factory = $injector.get(factoryName);

                    if (factory.url === undefined) {
                        throw Error('No url property found on grid ' + factoryName);
                    }

                    var url = (overrides && overrides.url) ? overrides.url : factory.url;

                    var grid = factory.create();

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelect();
                    grid = this.addFiltersToGrid(grid, overrides['filterGroups']);
                    grid.perPageOptions = [5, 15, 25];
                    grid.setPerPage(grid.perPageOptions[0]);

                    // var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};
                    var defaultParams = grid.getRequestParams();

                    // this.addFiltersToGrid(grid, overrides['filterGroups']);
                    return $cbResource.get(url, defaultParams).then(function (response) {
                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .disableHyperlinks()
                            .disableHover()
                            .disableToggleColumns()
                            .setInitResultCount(response.unpaginatedTotal)
                        ;
                    });
                },

                // Possible overrides
                    // postpend -- specify a sting that is added to the end of the url that we qery each time.
                buildOTM: function (url, factoryName, initObject, isEditable, overrides = {}) {

                    var postpend = overrides.postpend ? overrides.postpend : "";

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    if (initObject && initObject.id) {
                        url = url + initObject.id + postpend;
                    }

                    grid.perPageOptions = isEditable ? [5, 15, 25] : [25, 50, 100];
                    cPerPage = grid.perPageOptions[0];

                    grid
                        .setResourceUrl(url)
                        .setPerPage(grid.perPageOptions[0])
                        .disableToggleColumns()
                        .setNoResultString('No linked objects found')
                        .disableHover()
                    ;

                    if (!initObject || !initObject.id) {
                        return grid;
                    }

                    // var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:cPerPage};
                    var defaultParams = grid.getRequestParams();
                    // Could also build defaults form the grid...

                    return $cbResource.get(url, defaultParams).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                            .setInitResultCount(response.unpaginatedTotal)
                        ;

                    });
                }
            };
            return gridBuilder
        }
    ])
;
