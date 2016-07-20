angular.module('grid.gridFactory', [])

    .factory('gridFactory', ['gridColumnFactory', 'gridFilterFactory',

        function (gridColumnFactory, gridFilterFactory) {

            var Grid = function () {

                this.results = [];

                this.initResultCount = 0;

                this.data = null;

                this.columns = [];

                this.filters = [];

                this.actionTemplate = null;

                this.resourceUrl = null;

                this.sortingColumn = null;

                this.sortDirection = null;

                this.pagination = {
                    page: 1,
                    perPage: 5
                };

                this.search = '';

                this.showFilters = true;

                this.staticFilters = [];

                this.isEditable = false;

                this.removingItems = [];

                this.removingItemIds = [];

                this.addingItems = [];

                this.addingItemIds = [];

                this.allowToggleColumns = true;

                this.noResultString = 'No Results';

                this.isHoverable = true;

                this.showHyperLinks = true;

            };

            Grid.prototype = {

                perPageOptions: [10, 25, 50, 100],

                create: function () {

                    return new Grid();

                },

                setResults: function (results, initial) {

                    if (initial === undefined || initial === true) {
                        this.initResultCount = results.length;
                    }

                    this.results = results;

                    return this;

                },

                setData: function (data) {

                    this.data = data;

                    this.turnPage();

                    return this;

                },

                setPage: function (page) {

                    this.pagination.page = page;

                    return this;

                },

                turnPage: function () {

                    var startIndex = ((this.pagination.page - 1) * this.pagination.perPage);

                    this.results = this.data.slice(startIndex, startIndex + this.pagination.perPage);

                    this.pagination.startIndex = startIndex + 1;

                    this.pagination.stopIndex = startIndex + this.results.length;

                    this.pagination.paginatedTotal = this.results.length;
                    this.pagination.unpaginatedTotal = this.data.length;

                    return this;

                },

                setPerPage: function (perPage) {

                    this.pagination.perPage = perPage;

                    return this;
                },

                addColumns: function (columns) {

                    var that = this;
                    columns.map(function (column) {
                        that.addColumn(column);
                    });

                    return this;

                },

                addColumn: function (column) {

                    this.columns.push(gridColumnFactory.create(column));

                    return this;

                },

                addFilters: function (filters) {

                    var that = this;
                    filters.map(function (filter) {
                        that.addFilter(filter);
                    });

                    return this;

                },

                addFilter: function (filter) {

                    this.filters.push(gridFilterFactory.create(filter));

                    return this;

                },

                hideFilters: function () {

                    this.showFilters = false;

                    return this;

                },

                allowEdit: function () {

                    this.isEditable = true;

                    return this;

                },

                disallowEdit: function () {

                    this.isEditable = false;

                    return this;

                },


                setStaticFilters: function (staticFilters) {

                    this.staticFilters = staticFilters;

                    return this;

                },

                setActionTemplate: function (actionTemplate) {

                    this.actionTemplate = actionTemplate;

                    return this;

                },

                setPaginationFromResponse: function (response) {

                    this.pagination = {
                        hasNextPage: response.hasNextPage,
                        page: response.page,
                        paginatedTotal: response.paginatedTotal,
                        perPage: response.perPage,
                        unpaginatedTotal: response.unpaginatedTotal,
                    };

                    this.pagination.startIndex = this.getStartIndex();
                    this.pagination.stopIndex = this.getStopIndex();

                    return this;

                },

                setPagination: function (pagination) {

                    this.pagination = pagination;

                    return this;

                },

                getStartIndex: function () {

                    return this.pagination.perPage * this.pagination.page - this.pagination.perPage + 1;

                },

                getStopIndex: function () {

                    return this.pagination.perPage * this.pagination.page - this.pagination.perPage + this.pagination.paginatedTotal;

                },

                disableToggleColumns: function () {

                    this.allowToggleColumns = false;

                    return this;

                },

                toggleColumn: function (column) {

                    column.isVisible = column.isVisible ? false : true;

                },

                sortColumn: function (sortColumn, direction) {

                    var that = this;
                    this.columns.map(function (column) {

                        if (column.name === sortColumn.name) {

                            column.sortDirection = direction;

                            that.sortingColumn = column;
                            that.sortDirection = direction;

                        }
                        else {

                            column.sortDirection = column.sort.NONE;

                        }


                    });

                    return this;

                },

                setResourceUrl: function (resourceUrl) {

                    this.resourceUrl = resourceUrl;

                    return this;

                },

                getRequestPath: function () {

                    var path = this.resourceUrl + '?';

                    var params = [];

                    if (this.sortingColumn) {
                        params.push('cOrderBy=' + this.sortingColumn.name);
                    }

                    if (this.sortDirection) {
                        params.push('cOrderByDirection=' + this.sortDirection);
                    }

                    if (this.search != '') {
                        params.push('cSearch=' + this.search);
                    }

                    this.staticFilters.map(function (staticFilter) {
                        params = params.concat(staticFilter);
                    });

                    this.filters.map(function (filter) {
                        params = params.concat(filter.getParams());
                    });

                    params.push('cPerPage=' + this.pagination.perPage);
                    params.push('cPage=' + this.pagination.page);

                    return path + params.join('&');

                },

                removeItem: function (item) {

                    this.removingItems.push(item);
                    this.removingItemIds.push(item.id);

                    return this;

                },

                restoreRemovedItem: function (item) {

                    this.removingItems.splice(this.removingItems.indexOf(item), 1);
                    this.removingItemIds.splice(this.removingItemIds.indexOf(item.id), 1);

                    return this;

                },

                removeAddingItem: function (item) {

                    this.addingItems.splice(this.addingItems.indexOf(item), 1);
                    this.addingItemIds.splice(this.addingItemIds.indexOf(item.id), 1);

                    return this;

                },

                addItem: function (item) {

                    this.addingItems.push(item);
                    this.addingItemIds.push(item.id);

                    return this;

                },

                setNoResultString: function (noResultString) {
                    this.noResultString = noResultString;
                    return this;
                },

                disableHover: function () {
                    this.isHoverable = false;
                    return this;
                },

                disableHyperlinks: function () {
                    this.showHyperLinks = false;
                    return this;
                }

            }

            Grid.create = function () {

                return new Grid();

            };

            return Grid;

        }

    ])
;
