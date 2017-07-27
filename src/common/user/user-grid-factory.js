angular.module('user.userGridFactory', [])

    .factory('userGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var userGridFactory = {

                url: '/user',

                actionTemplate: 'common/user/partials/user-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'admin.user_detail({id:result.id})'
                    },
                    {
                        header: 'Enabled',
                        bindTo: 'enabled ? "Yes" : "No"',
                        isSortable: true,
                        name: 'enabled'
                    },
                    {
                        header: 'Username',
                        bindTo: 'username',
                        name: 'username',
                        isSortable: true,
                        sref: 'admin.user_detail({id:result.id})'
                    },
                    {
                        header: 'First Name',
                        bindTo: 'firstName',
                        name: 'firstName',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Last Name',
                        bindTo: 'lastName',
                        name: 'lastName',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Email',
                        bindTo: 'email',
                        name: 'email',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Created At',
                        bindTo: 'createdAt | date:\'MMM d, y\'',
                        name: 'createdAt',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Updated At',
                        bindTo: 'updatedAt | date:\'MMM d, y\'',
                        name: 'updatedAt',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    }

                ],

                filters: [
                    {
                        type: 'string',
                        title: 'First Name',
                        filterProperty: 'firstName',
                        isVisible: false
                    },
                    {
                        type: 'string',
                        title: 'Last Name',
                        filterProperty: 'lastName',
                        isVisible: false
                    },
                    {
                        type: 'string',
                        title: 'Email',
                        filterProperty: 'email',
                        isVisible: false
                    },
                    {
                        type: 'boolean',
                        title: 'Enabled',
                        filterProperty: 'enabled',
                        isVisible: false
                    },
                     {
                        type: 'time',
                        title: 'Created At',
                        filterProperty: 'createdAt',
                        isVisible: false
                    },
                     {
                        type: 'time',
                        title: 'Updated At',
                        filterProperty: 'updatedAt',
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

            return userGridFactory;

        }

    ])
;
