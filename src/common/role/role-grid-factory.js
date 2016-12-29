angular.module('role.roleGridFactory', [])

    .factory('roleGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

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

                }

            };

            return roleGridFactory;

        }

    ])
;
