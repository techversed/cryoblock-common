angular.module('group.groupGridFactory', [])

    .factory('groupGridFactory', ['gridFactory', '$cbResource', '$location', '$injector',

        function (gridFactory, $cbResource, $location, $injector) {

            var groupGridFactory = {

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
                        // sref: 'sample.detail({id:result.id})'
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
                        .setActionTemplate('common/group/partials/group-row-actions-tpl.html')
                        .setResourceUrl('/group')
                        .setBindToState(true)
                    ;

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get('/group', params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                        ;

                    });

                },

                getOneToOneGrid: function () {

                    var grid = this.create();

                    grid.perPageOptions = [3, 10, 25];

                    grid
                        .setResourceUrl('/group')
                        .disableToggleColumns()
                        .setPerPage(3)
                        .allowSelect()
                    ;

                    var params = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage: 3};

                    return $cbResource.get('/group', params).then(function (response) {


                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                        ;

                    });
                },

                getRoleGrid: function (groupId, isEditable) {

                    var roleGridFactory = $injector.get('roleGridFactory');

                    var grid = roleGridFactory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    grid
                        .setResourceUrl('/group-role' + groupId)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked roles found')
                        .disableHover()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    if (!groupId) {
                        return grid;
                    }

                    return $cbResource.get('/group-role/group/' + groupId).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                },

                getUserGrid: function (groupId, isEditable) {

                    var userGridFactory = $injector.get('userGridFactory');

                    var grid = userGridFactory.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    grid
                        .setResourceUrl('/user-group' + groupId)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked roles found')
                        .disableHover()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    if (!groupId) {
                        return grid;
                    }

                    return $cbResource.get('/user-group/group/' + groupId).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                }

            };

            return groupGridFactory;

        }

    ])
;
