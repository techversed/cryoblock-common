angular.module('grid.gridBuilder', [])

    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location', '$q',

        function ($injector, $cbResource, $location, $q) {

            var gridBuilder = {

                //possible overrides: url
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

                    });

                },

                buildMTMGrids: function (url, factoryName, initObject, isEditable) {

                    promises = []
                    promises.push(this.buildOTM(url, factoryName, initObject, isEditable));
                    promises.push(this.buildSelect(url, factoryName, initObject));

                    return $q.all(promises);

                },

                buildSelect: function (url, factoryName, initObject, single) {

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    if (initObject && initObject.id) {
                        url = url + initObject.id
                    } else {
                        url = url + 0
                    }

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelectMany()

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

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

                    });

                },

                buildSelectSingle: function (factoryName, overrides) {

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

                    });

                },

                buildOTM: function (url, factoryName, initObject, isEditable) {

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    if (initObject && initObject.id) {
                        url = url + initObject.id
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

                },

                //Experimental for bulk action work. copied form build OTM then modified.
                buildBulkAction: function (url, factoryName, initObject, isEditable, overrides = {}) {

                    var factory = $injector.get(factoryName);
                    //set action tempalate to row actions. -- add checkboxes and another gear to apply the row actions to all selected.

                    var grid = factory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    var postpend = overrides['url'] ? overrides['url'] : '';
                    // var postpend = '?plateType[EQ]=transformation';

                    if (initObject && initObject.id) {
                        url = url + initObject.id + postpend;
                    }

                    grid
                        .setResourceUrl(url)
                        .setPerPage(3)
                        // .disableToggleColumns() //They may want this... We would really like to avoid having plate detail pages because it makes the system more complicated for the user... if we could display all needed information in the grid that would be really great.
                        .setActionTemplate(factory.actionTemplate) // Should add the row actions
                        .setNoResultString('No linked objects found')
                        .disableHover()
                    ;

                    grid.perPageOptions = isEditable ? [3, 10, 25] : [25, 50, 100];
                    cPerPage = isEditable ? 3 : 100;

                    if (!initObject || !initObject.id) {
                        return grid;
                    }

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'ASC', cPerPage:cPerPage};

                    //it would make sense to add a boolean column to ech of the elements before returning them.
                    return $cbResource.get(url, defaultParams).then(function (response) {

                        //We may just strike this all together and just figure it out another way.
                        // for (var counter =0; counter < response.data.length; counter ++) {
                        //      response.data[counter].applyAction = false;
                        //  }
                        // console.log(response.data);

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
