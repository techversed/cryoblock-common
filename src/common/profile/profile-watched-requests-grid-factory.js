angular.module('profile.profileWatchedRequestsGridFactory', [])

    .factory('profileWatchedRequestsGridFactory', ['gridFactory',

        function (gridFactory) {

            var watchedRequestsGridFactory = {

                url: '/cryoblock/user-object-notification/watched-requests',

                actionTemplate: 'common/profile/partials/profile-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Object Id',
                        bindTo: 'entity.alias',
                        name: 'entity.alias',
                        isVisible: true,
                        templateUrl: 'common/profile/partials/profile-grid-id-tpl.html'
                    },
                    {
                        header: 'Status',
                        bindTo: 'entity.status',
                        name: 'entity.status',
                        isVisible: true,
                        templateUrl: 'common/profile/partials/profile-status-column-tpl.html'
                    },
                    {
                        header: 'Name',
                        bindTo: 'entity.name',
                        name: 'entity.name',
                        isVisible: true
                    },
                    {
                        header: 'Description',
                        bindTo: 'entity.description',
                        name: 'entity.description',
                        isVisible: true
                    },
                    {
                        header: 'Project',
                        bindTo: 'entity.projectString',
                        name: 'entity.projectString',
                        isVisible: true
                    },
                    {
                        header: 'Updated By',
                        bindTo: 'entity.updatedBy.fullName',
                        name: 'entity.updatedBy.fullName',
                        isVisible: true
                    }

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
                    ;
                    return grid;
                }

            };

            return watchedRequestsGridFactory;
        }
    ])
;
