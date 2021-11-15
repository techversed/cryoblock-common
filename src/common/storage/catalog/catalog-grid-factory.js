angular.module('storage.catalog.catalogGridFactory', [])

    .factory('catalogGridFactory', ['gridFactory',

        function (gridFactory) {

            var catalogGridFactory = {

                url: '/storage/catalog',

                actionTemplate: 'common/storage/catalog/partials/catalog-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'catalog.detail({id:result.id})'
                    },
                    {
                        header: 'Status',
                        bindTo: 'status',
                        name: 'status',
                        templateUrl: 'common/storage/catalog/partials/catalog-status-column-tpl.html',
                        isSortable: true
                    },
                    {
                        header: 'Name',
                        bindTo: 'name',
                        name: 'name',
                        isSortable: true,
                        sref: 'catalog.detail({id:result.id})'
                    },
                    {
                        header: 'Description',
                        bindTo: 'description',
                        name: 'description',
                        isSortable: true,
                        isVisible: false
                    },
                    {
                        header: 'Donor',
                        bindTo: 'donor.stringLabel',
                        name: 'donor',
                        isSortable: true,
                        sref: 'donor.detail({id:result.donor.id})'
                    },
                    {
                        header: 'Target',
                        bindTo: 'target.name',
                        name: 'target',
                        isSortable: true,
                        sref: 'target.detail({id:result.target.id})'
                    },
                    {
                        header: 'Patent',
                        bindTo: 'patent.name',
                        name: 'patent',
                        isSortable: true,
                        sref: 'patent.detail({id:result.patent.id})'
                    },
                    {
                        header: 'Sample Count',
                        name: 'sampleCount',
                        bindTo: 'sampleCount'
                    },
                    {
                        header: 'Merged Into',
                        name: 'mergedInto',
                        bindTo: 'mergedInto.name',
                        sref: 'catalog.detail({id:result.mergedInto.id})'
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
                    },
                    {
                        header: 'Date Created',
                        bindTo: 'createdAt | date:\'MMM d, y\'',
                        name: 'createdAt',
                        isSortable: true
                    },
                    {
                        header: 'Date Updated',
                        bindTo: 'updatedAt | date:\'MMM d, y\'',
                        name: 'updatedAt',
                        isSortable: true,
                        isVisible: false
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Name',
                        filterProperty: 'name',
                        isVisible: false
                    },
                    {
                        type: 'enum',
                        title: 'Status',
                        filterProperty: 'status',
                        bindTo: 'status',
                        enum: ['Available', 'Depleted', 'Destroyed'],
                        isVisible: true
                    },
                    {
                        type: 'relation',
                        title: 'Target',
                        accessProperty: 'id',
                        filterProperty: 'target.id',
                        resourceUrl: '/storage/target',
                        bindTo: 'name',
                        isVisible: true
                    },
                    {
                        type: 'relation',
                        title: 'Donor',
                        accessProperty: 'id',
                        filterProperty: 'donorId',
                        resourceUrl: '/donor/donor',
                        bindTo: 'stringLabel',
                        isVisible: true
                    },
                    {
                        type: 'relation',
                        title: 'Created By',
                        accessProperty: 'id',
                        filterProperty: 'createdById',
                        resourceUrl: '/user',
                        bindTo: 'fullName'
                    },
                    {
                        type: 'relation',
                        title: 'Updated By',
                        accessProperty: 'id',
                        filterProperty: 'updatedById',
                        resourceUrl: '/user',
                        bindTo: 'fullName',
                        isVisible: false
                    },
                    {
                        type: 'deleted',
                        title: 'Show Deleted',
                        filterProperty: 'cShowDeleted',
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

            return catalogGridFactory;

        }

    ])
;
