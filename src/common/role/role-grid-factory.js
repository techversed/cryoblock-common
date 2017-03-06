angular.module('role.roleGridFactory', [])

    .factory('roleGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var roleGridFactory = {

                url: '/role',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'admin.role_detail({id:result.id})'
                    },
                    {
                        header: 'Name',
                        bindTo: 'role',
                        name: 'role',
                        isSortable: true,
                        sref: 'admin.role_detail({id:result.id})'
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

            return roleGridFactory;

        }

    ])
;
