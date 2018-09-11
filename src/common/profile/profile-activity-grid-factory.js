angular.module('profile.profileActivityGridFactory', [])

    .factory('profileActivityGridFactory', ['gridFactory', '$cbResource', '$location', '$injector', 'sessionFactory',

        function (gridFactory, $cbResource, $location, $injector, sessionFactory) {

            var activityGridFactory = {

                url: '/log-entry',

                columns: [
                    {
                        header: 'Object Id',
                        bindTo: 'objectId',
                        name: 'objectId',
                        isVisible: true
                    },
                    {
                        header: 'Object',
                        bindTo: 'objectClass',
                        name: 'objectClass',
                        isVisible: true
                    },
                    {
                        header: 'Action',
                        bindTo: 'action',
                        name: 'action',
                        isVisible: true
                    },
                    {
                        header: 'Time',
                        bindTo: 'loggedAt',
                        name: 'loggedAt',
                        isVisible: true
                    },
                    {
                        header: 'Version',
                        bindTo: 'version',
                        name: 'version',
                        isVisible: true
                    },
                    {
                        header: 'Data',
                        bindTo: 'data',
                        name: 'data',
                        isVisible: true
                    },
                    {
                        header: 'User',
                        bindTo: 'username',
                        name: 'username',
                        isVisible: true
                    },

                ],

                filters: [
                    {
                        type: 'integer',
                        title: 'ID',
                        filterProperty: 'id'
                    },

                ],
                create: function () {

                    var grid = gridFactory.create()
                        .addColumns(this.columns)
                        .sortColumn(this.columns[1], 'DESC')
                        .addFilters(this.filters)
                    ;
                    return grid;
                }

            };

            return activityGridFactory;
        }
    ])
;
