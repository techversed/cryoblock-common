angular.module('group.groupGridFactory', [])

    .factory('groupGridFactory', ['gridFactory',

        function (gridFactory) {

            var groupGridFactory = {

                url: '/group',

                actionTemplate: 'common/group/partials/group-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'admin.group_detail({id:result.id})'
                    },
                    {
                        header: 'Name',
                        bindTo: 'name',
                        name: 'name',
                        isSortable: true,
                        sref: 'admin.group_detail({id:result.id})'
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'name',
                        filterProperty: 'name',
                        isVisible: false
                    },
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return groupGridFactory;

        }

    ])
;
