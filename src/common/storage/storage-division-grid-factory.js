angular.module('storage.storageDivisionGridFactory', [])

    .factory('storageDivisionGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var storageDivisionGridFactory = {

                url: '/storage/division',

                actionTemplate: 'common/storage/partials/storage-division-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                    },
                    {
                        header: 'Has Dimension',
                        bindTo: 'hasDimension ? "Yes" : "No"',
                        isSortable: true,
                        name: 'hasDimension'
                    },
                    {
                        header: 'Height',
                        bindTo: 'height',
                        name: 'height',
                        isSortable: true,
                    },
                    {
                        header: 'Width',
                        bindTo: 'width',
                        name: 'width',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Available Slots',
                        bindTo: 'availableSlots',
                        name: 'availableSlots',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Used Slots',
                        bindTo: 'usedSlots',
                        name: 'usedSlots',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Total Slots',
                        bindTo: 'totalSlots',
                        name: 'totalSlots',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Percent full',
                        bindTo: 'percentFull',
                        name: 'percentFull',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Title',
                        bindTo: 'title',
                        name: 'title',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Description',
                        bindTo: 'description',
                        name: 'description',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    }

                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Description',
                        filterProperty: 'description',
                        isVisible: false
                    }
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return storageDivisionGridFactory;

        }

    ])
;
