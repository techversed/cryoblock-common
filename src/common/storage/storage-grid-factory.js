angular.module('storage.storageGridFactory', [])

    .factory('storageGridFactory', ['gridFactory', 'sampleTypeGridFactory', 'storageFactory', 'storageContainerGridFactory', '$cbResource',

        function (gridFactory, sampleTypeGridFactory, storageFactory, storageContainerGridFactory, $cbResource) {


            /*
                This is not currently being used --  Ross created another one that is now the one that is being used...


            */
            /*
                Outstanding issues:
                    We need to fix the settings on the sample creation suggested divisions.
            */

            var storageGridFactory = {

                url: '/storage/division',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Path',
                        bindTo: 'path',
                        name: 'path',
                        isSortable: false
                    },
                    {
                        header: 'Dimension',
                        bindTo: 'dimensionString',
                        name: 'dimensionString',
                        isSortable: false
                    },
                    {
                        header: 'Percent Full',
                        bindTo: 'percentFullString',
                        name: 'percentFull',
                        isSortable: false
                    },
                ],

                filters: [
                    {
                        type: 'boolean',
                        title: 'Has Dimension',
                        filterProperty: 'hasDimension',
                        isVisible: false
                    }
                ],

                create: function () {
                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        // .sortColumn(this.columns[0], 'DESC')
                    ;
                },

                /*
                    There are some problems with this -- the first set of results which get returned is different from the results from subsequent pages of results.

                        // Fixed the problem where the number of results in a grid is set to 3 -- it will stil

                        // Order by should not be set. -- we will also need to disable this.

                        // For some reason it is taking on the default params for a grid after the first request -- I still don't fully understand the problem but we are ok moving forwards with this I think.


                */

                getDivisionMatchGrid: function (sampleTypeId, storageContainerId) {

                    var grid = this.create();

                    var url = '/storage/division/match/' + sampleTypeId + '/' + storageContainerId;
                    var defaultParams = { cPerPage:25 }; // Change this

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelect()
                    // grid.perPageOptions = [3, 10, 25];
                    grid.perPageOptions = [25,50,100];
                    grid.setPagination({page: 1, perPage: 25});
                    grid.setPerPage(25);

                    if (!sampleTypeId && !storageContainerId) {
                        return grid;
                    }

                    return $cbResource.get(url, {}).then(function (response) {

                        grid.columns[0].sortDirection = 'None';

                        return grid
                            .setResults(response.data)
                            // .setPaginationFromResponse(response)
                            // .getRequestParams(response)
                            .disableHyperlinks()
                            .disableHover()
                            .setPerPage(25)
                            .disableToggleColumns()
                            .setInitResultCount(response.unpaginatedTotal)
                        ;

                    });
                }

            };

            return storageGridFactory;

        }

    ])
;
