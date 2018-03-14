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

                    //allow the user to override the url. In case the url depends upon something in the page making the request.
                    if(overrides.url != null){
                        factory.url = overrides.url;
                    }

                    grid
                        .setActionTemplate(factory.actionTemplate)
                        .setResourceUrl(factory.url)
                        .setBindToState(true)
                    ;

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get(factory.url, params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
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
                        ;

                    });

                },

                buildSelectSingle: function (factoryName) {

                    var factory = $injector.get(factoryName);

                    if (factory.url === undefined) {

                        throw Error('No url property found on grid ' + factoryName);

                    }

                    var grid = factory.create();

                    grid.setResourceUrl(factory.url);
                    grid.hideAllFilters();
                    grid.allowSelect()

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get(factory.url, defaultParams).then(function (response) {

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

                }

            };

            return gridBuilder

        }

    ])
;
