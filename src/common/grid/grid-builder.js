angular.module('grid.gridBuilder', [])

    .service('$cbGridBuilder', [ '$injector', '$cbResource', '$location',

        function ($injector, $cbResource, $location) {

            var gridBuilder = {

                buildIndex: function (factoryName) {

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    if (factory.url === undefined) {

                        throw Error('No url property found on grid ' + factoryName);

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

                buildSelect: function (factoryName, single) {

                    var factory = $injector.get(factoryName);

                    if (factory.url === undefined) {

                        throw Error('No url property found on grid ' + factoryName);

                    }

                    var grid = factory.create();

                    grid.setResourceUrl(factory.url);
                    grid.hideAllFilters();

                    if (single !== undefined && single) {

                        grid.allowSelect()

                    }

                    if (single === undefined) {

                        grid.allowSelectMany()

                    }

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

                    grid.perPageOptions = [3, 10, 25];

                    if (!initObject || !initObject.id) {
                        return grid;
                    }

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get(url, defaultParams).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                }

            };

            return gridBuilder

        }

    ])
;
