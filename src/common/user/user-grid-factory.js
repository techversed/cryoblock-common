angular.module('user.userGridFactory', [])

    .factory('userGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var userGridFactory = {

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
                        bindTo: 'createdAt',
                        name: 'createdAt',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Updated At',
                        bindTo: 'updatedAt',
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
                    }
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                },

                getIndexGrid: function () {

                    var grid = this.create();

                    grid
                        .setActionTemplate('common/user/partials/user-row-actions-tpl.html')
                        .setResourceUrl('/user')
                        .setBindToState(true)
                    ;

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get('/user', params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                        ;

                    });

                },

                getGroupGrid: function (userId, isEditable) {

                    var groupGridFactory = $injector.get('groupGridFactory');

                    var grid = groupGridFactory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    grid
                        .setResourceUrl('/user-group/user/' + userId)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked groups found')
                        .disableHover()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    if (!userId) {
                        return grid;
                    }

                    return $cbResource.get('/user-group/user/' + userId).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                },

                getSelectGrid: function () {

                    var grid = this.create();

                    grid.setResourceUrl('/user');

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get('/user', defaultParams).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .allowSelectMany()
                            .disableHover()
                            .setPerPage(3)
                            .disableToggleColumns()
                        ;

                    });

                }

            };

            return userGridFactory;

        }

    ])
;
