angular.module('grid.gridBuilder', [])

    .service('$cbGridBuilder', [ '$injector', '$cbResource',

        function ($injector, $cbResource) {

            var gridBuilder = {

                buildSelect: function (url, factoryName) {

                    var factory = $injector.get(factoryName);

                    var grid = factory.create();

                    grid.setResourceUrl(url);

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get(url, defaultParams).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .allowSelectMany()
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

                    if (initObject) {
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

                    if (!initObject) {
                        return grid;
                    }

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};

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
