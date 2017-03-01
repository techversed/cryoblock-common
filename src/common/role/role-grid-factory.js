angular.module('role.roleGridFactory', [])

    .factory('roleGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var roleGridFactory = {

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

                },

                getIndexGrid: function () {

                    var grid = this.create();

                    grid
                        .setActionTemplate('common/role/partials/role-row-actions-tpl.html')
                        .setResourceUrl('/role')
                        .setBindToState(true)
                    ;

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get('/role', params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                        ;

                    });

                },

                getGroupGrid: function (roleId, isEditable) {

                    var groupGridFactory = $injector.get('groupGridFactory');

                    var grid = groupGridFactory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    grid
                        .setResourceUrl('/group-role/role' + roleId)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked groups found')
                        .disableHover()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    if (!roleId) {
                        return grid;
                    }

                    return $cbResource.get('/group-role/role/' + roleId).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                },

                getSelectGrid: function () {

                    var grid = this.create();

                    grid.setResourceUrl('/role');

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get('/role', defaultParams).then(function (response) {

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

            return roleGridFactory;

        }

    ])
;
