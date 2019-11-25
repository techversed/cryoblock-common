angular.module('storage.storageDivisionGridFactory', [])

    .factory('storageDivisionGridFactory', ['gridFactory',

        function (gridFactory) {

            var storageDivisionGridFactory = {

                url: '/storage/division-search',

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
                        header: 'Path',
                        bindTo: 'path',
                        name: 'path',
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
                        header: 'Editors',
                        bindTo: 'divisionEditorString',
                        name: 'divisionEditorString',
                        isSortable: false
                    },
                    {
                        header: ' Group Editors',
                        bindTo: 'divisionGroupEditorString',
                        name: 'divisionGroupEditorString',
                        isSortable: false
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
                        isSortable: true
                    },
                    {
                        header: 'Total Slots',
                        bindTo: 'totalSlots',
                        name: 'totalSlots',
                        isSortable: true,
                    },
                    {
                        header: 'Percent full',
                        bindTo: 'percentFull',
                        name: 'percentFull',
                        isSortable: true,
                    },
                    {
                        header: 'Created By',
                        bindTo: 'createdBy.fullName',
                        sref: 'profile.detail({id: result.createdBy.id})',
                        name: 'createdBy'
                    },
                    {
                        header: 'Updated By',
                        bindTo: 'updatedBy.fullName',
                        sref: 'profile.detail({id: result.updatedBy.id})',
                        name: 'updatedBy',
                        isVisible: false
                    }
                ],

                filters: [
                    {
                        type: 'relation',
                        title: 'Editors',
                        accessProperty: 'id',
                        filterProperty: 'divisionEditors.user.id',
                        resourceUrl: '/user',
                        bindTo: 'fullName',
                        isVisible: true
                    },
                    {
                        type: 'relation',
                        title: 'Group Editors',
                        accessProperty: 'id',
                        filterProperty: 'divisionGroupEditors.group.id',
                        resourceUrl: '/group',
                        bindTo: 'name',
                        isVisible: true
                    },
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
                        type: 'boolean',
                        title: 'Has Dimension',
                        filterProperty: 'hasDimension',
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
