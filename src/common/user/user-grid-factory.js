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
<<<<<<< HEAD
                        header: 'Active',
                        bindTo: 'enabled',
                        name: 'enabled',
=======
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
>>>>>>> 339bfedb715f09df3f689ddcbdd66d83404eebf4
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
                        title: 'Active',
                        filterProperty: 'enabled',
                        isVisible: true
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
