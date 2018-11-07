angular.module('storage.catalog.catalogGridFactory', [])

    .factory('catalogGridFactory', ['gridFactory', '$cbResource',

        function (gridFactory, $cbResource) {

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
                        header: 'Name',
                        bindTo: 'name',
                        name: 'name',
                        isSortable: true,
                        sref: 'catalog.detail({id:result.id})'
                    },
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
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return catalogGridFactory;

        }

    ])
;
