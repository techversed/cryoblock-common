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
                        sref: 'storage.division.detail({id:result.id})'
                    },
                       {
                        header: 'Title',
                        bindTo: 'title',
                        name: 'title',
                        isSortable: true,
                        sref: 'storage.division.detail({id:result.id})'
                    },
                    {
                        header: 'Description',
                        bindTo: 'description',
                        name: 'description',
                        isSortable: true,
                        sref: 'storage.division.detail({id:result.id})'
                    },
                    {
                        header: 'Path',
                        bindTo: 'path',
                        name: 'path',
                        isSortable: true,
                        sref: 'storage.division.detail({id:result.id})'
                    },
                    {
                        header: 'IdPath',
                        bindTo: 'idPath',
                        name: 'idPath',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Level',
                        bindTo: 'level',
                        name: 'level',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Parent',
                        bindTo: 'parent',
                        name: 'parent',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'ParentID',
                        bindTo: 'parentId',
                        name: 'parentId',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                       {
                        header: 'Children',
                        bindTo: 'children',
                        name: 'children',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
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
                        header: 'Has Dimension',
                        bindTo: 'hasDimension ? "Yes" : "No"',
                        isSortable: true,
                        name: 'hasDimension'
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
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Title',
                        filterProperty: 'title',
                        isVisible: false
                    },
                    {
                        type: 'string',
                        title: 'Description',
                        filterProperty: 'description',
                        isVisible: false
                    },
                    {
                        type: 'string',
                        title: 'Path',
                        filterProperty: 'path',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Height',
                        filterProperty: 'height',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Width',
                        filterProperty: 'width',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Available Slots',
                        filterProperty: 'availableSlots',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Used Slots',
                        filterProperty: 'usedSlots',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Total Slots',
                        filterProperty: 'totalSlots',
                        isVisible: false
                    },
                    {
                        type: 'integer',
                        title: 'Percent Full',
                        filterProperty: 'percentFull',
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
