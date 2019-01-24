angular.module('profile.profileActivityGridFactory', [])

    .factory('profileActivityGridFactory', ['gridFactory', '$cbResource', '$location', '$injector', 'sessionFactory', 'profileGridDecorator',

        function (gridFactory, $cbResource, $location, $injector, sessionFactory, profileGridDecorator) {

            var activityGridFactory = {

                url: '/log-entry',

                columns: [
                    {
                        header: 'Object Id',
                        bindTo: 'objectId',
                        name: 'objectId',
                        isVisible: true,
                        templateUrl: 'common/profile/partials/profile-grid-id-tpl.html'
                    },
                    {
                        header: 'Object',
                        bindTo: 'objectName',
                        name: 'objectName',
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
                        bindTo: 'loggedAt | date:\'MMM d, y\'',
                        name: 'loggedAt',
                        isVisible: true
                    }
                    /*
                    ,
                    {
                        header: 'Data',
                        bindTo: 'data.description',
                        name: 'data',
                        isVisible: true
                    },
                    {
                        header: 'User',
                        bindTo: 'username',
                        name: 'username',
                        isVisible: true
                    },
                    */

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
                        .sortColumn(this.columns[3], 'DESC')
                        .addFilters(this.filters)
                        .setDecorator(profileGridDecorator)
                    ;
                    return grid;
                }

            };

            return activityGridFactory;
        }
    ])
;
