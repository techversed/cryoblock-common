angular.module('storage.storageGridFactory', [])

    .factory('storageGridFactory', ['gridFactory', 'sampleTypeGridFactory', 'storageFactory', 'storageContainerGridFactory', '$cbResource',

        function (gridFactory, sampleTypeGridFactory, storageFactory, storageContainerGridFactory, $cbResource) {

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
                        isSortable: true
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
                        .sortColumn(this.columns[0], 'DESC')
                    ;
                },

                getDivisionMatchGrid: function (sampleTypeId, storageContainerId) {

                    var grid = this.create();
                    var url = '/storage/division/match/' + sampleTypeId + '/' + storageContainerId;
                    var defaultParams = { cPerPage:3 };

                    grid.setResourceUrl(url);
                    grid.hideAllFilters();
                    grid.allowSelect()
                    grid.perPageOptions = [3, 10, 25];

                    if (!sampleTypeId && ! storageContainerId) {
                        return grid;
                    }

                    return $cbResource.get(url, {}).then(function (response) {

                        grid.columns[0].sortDirection = 'None';

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
                }

            };

            return storageGridFactory;

        }

    ])
;
