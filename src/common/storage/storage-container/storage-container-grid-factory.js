angular.module('storageContainer.storageContainerGridFactory', [])

    .factory('storageContainerGridFactory', ['gridFactory',

        function (gridFactory) {

            var storageContainerGridFactory = {

                url: '/storage/storage-container',

                actionTemplate: 'common/storage/storage-container/partials/storage-container-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'storage_container.detail({id:result.id})'
                    },
                    {
                        header: 'Name',
                        bindTo: 'name',
                        name: 'name',
                        isVisible: true
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Name',
                        filterProperty: 'name',
                        isVisible: false
                    }
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .sortColumn(this.columns[0], 'DESC')
                        .addFilters(this.filters)
                    ;

                }

            };

            return storageContainerGridFactory;

        }

    ])
;
