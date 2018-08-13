angular.module('grid.gridBuilder', [])

    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location', '$q', 'gridManager',

        function ($injector, $cbResource, $location, $q, gridManager) {

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
                    var params = gridManager.ignoreUrlParams ? defaultParams : angular.extend(defaultParams, $location.search());

                    return $cbResource.get(url, params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .setInitResultCount(response.unpaginatedTotal)
                        ;

                    });

                },

                //Available overrides
                    //otmPostpend -- allows you to specify text that will be added to the end of the url that is used to build the otm grid
                    //selectPostpend -- allows you to specify text taht will be added to the end of the url that is used to build the select grid.
                buildMTMGrids: function (url, factoryName, initObject, isEditable, overrides = {}) {

                    var otmPostpend = overrides.otmPostpend ? overrides.selectPostpend : "";
                    var selectPostpend = overrides.selectPostpend ? overrides.selectPostpend : "";

                    promises = []
                    promises.push(this.buildOTM(url, factoryName, initObject, isEditable, {postpend : otmPostpend}));
                    promises.push(this.buildSelect(url, factoryName, initObject, undefined, {postpend : selectPostpend}));

                    return $q.all(promises);

                },

                //Possible overrides
                    //postpend -- a string that will be added to the end of the url that is passed in.
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
