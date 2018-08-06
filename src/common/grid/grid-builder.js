angular.module('grid.gridBuilder', [])

    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location', '$q',

        function ($injector, $cbResource, $location, $q) {

            var gridBuilder = {

                //Build the grid for an index page.
                //possible overrides:
                    //url -- specify a url that is used instead of the one included in the grid factory - Can be useful when you want to use the same grid factory but you want to use an address to a relation's controller instead of the controller for an entity.
                    //filterGroups -- lets you specify filters to add directly to the grid.
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

                    var defaultParams = { cOrderBy: grid.sortingColumn.name, cOrderByDirection: grid.sortDirection};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get(url, params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .setInitResultCount(response.unpaginatedTotal)
                        ;

                    }).then( this.addFiltersToGrid(grid, overrides['filterGroups']));

                },

                //Build a grid using a grid factory using a linker table. Find the entities that are linked with the specified one

                //Available overrides
                    //otmPostpend -- allows you to specify text that will be added to the end of the url that is used to build the otm grid
                    //selectPostpend -- allows you to specify text taht will be added to the end of the url that is used to build the select grid.
                    //selectFilterGroups -- allows you to pass a list of filters that are autoenabled in the form [[filter1: value1], [filter2: value2], [filter3:value3]]
                    //not yet implemented -- otmFilterGroups -- might not even implement this.

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

                    if (initObject && initObject.id) {
                        url = url + initObject.id + postpend;
                    } else {
                        url = url + 0 + postpend;
                    }

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelectMany();

                    var defaultParams = {cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    if (single === undefined) {
                        grid.setStaticFilters({'cSelectable' : true});
                        defaultParams['cSelectable'] = true;
                    }

                    return $cbResource.get(url, defaultParams).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .disableHyperlinks()
                            .disableHover()
                            .setPerPage(3)
                            .disableToggleColumns()
                            .setInitResultCount(response.unpaginatedTotal)
                        ;
                    }).then(this.addFiltersToGrid (grid, overrides['filterGroups']));
                },

                //Helper function used to implement the overrrides for the various other grid functions -- not intended to be called directly
                addFiltersToGrid: function (grid, filterOverride){
                    if (filterOverride != {} && filterOverride != undefined) {
                        var filterObjIndex;
                        var filterObjectKeys = Object.keys(filterOverride);

                        angular.forEach(grid.filters, function (filter) {
                            filterObjIndex = filterObjectKeys.indexOf(filter.title); //need to use title instead of bind to because there can be multiple realtions bound to the same field on different objects.
                            console.log(filter);
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
                                        filter.selectionString = filterOverride[filterObjectKeys[filterObjIndex]][0];
                                        break;

                                    case "integer": // not implemented yet
                                        break;

                                    case "string": // not implemented yet
                                        break;

                                    case "boolean": // not implemented yet
                                        break;

                                    case "deleted": // not implemented yet
                                        break;

                                    case "date": // not implemented yet
                                        break;
                                }

                            }
                        });
                    }
                    return grid;
                },

                //Build a grid for use with forms that allows the user to select one option

                //Possible overrides
                    //url -- if you would like to use an alternate url post it here.
                    //filterGroups -- List the filters that will be applied by default.

                buildSelectSingle: function (factoryName, overrides = {}) {

                    var factory = $injector.get(factoryName);

                    if (factory.url === undefined) {

                        throw Error('No url property found on grid ' + factoryName);

                    }

                    var url = factory.url;

                    if (overrides && overrides.url) {
                        url = overrides.url;
                    }

                    var grid = factory.create();

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelect()

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get(url, defaultParams).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .disableHyperlinks()
                            .disableHover()
                            .setPerPage(3)
                            .disableToggleColumns()
                            .setInitResultCount(response.unpaginatedTotal)
                        ;

                    }).then(this.addFiltersToGrid(grid, overrides['filterGroups']));

                },

                //Possible overrides
                    //postpend -- specify a sting that is added to the end of the url that we qery each time.

                buildOTM: function (url, factoryName, initObject, isEditable, overrides = {}) {

                    var postpend = overrides.postpend ? overrides.postpend : "";

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    if (initObject && initObject.id) {
                        url = url + initObject.id + postpend;
                    }

                    grid
                        .setResourceUrl(url)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked objects found')
                        .disableHover()
                    ;

                    grid.perPageOptions = isEditable ? [3, 10, 25] : [25, 50, 100];
                    cPerPage = isEditable ? 3 : 25;

                    if (!initObject || !initObject.id) {
                        return grid;
                    }

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:cPerPage};

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
