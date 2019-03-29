angular.module('grid.gridFactory', [])

    .factory('gridFactory', ['gridColumnFactory', 'gridFilterFactory', '$location',

        function (gridColumnFactory, gridFilterFactory, $location) {

            var Grid = function () {

                this.results = [];

                this.initResultCount = 0;

                this.data = null;

                this.refreshCount = 0;

                this.columns = [];

                this.filters = [];

                this.loading = true;

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

                this.hidePagination = false;

                this.staticFilters = [];

                this.isEditable = false;

                this.isSelectable = false;

                this.isManySelectable = false;

                this.removingItems = [];

                this.removingItemIds = [];

                this.addingItems = [];

                this.addingItemIds = [];

                this.selectedItem = null;

                this.allowToggleColumns = true;

                this.noResultString = 'No Results';

                this.isHoverable = true;

                this.showHyperLinks = true;

                this.bindToState = false;

                this.selectItemCallback = null;

                this.decorator = null;

            };

            Grid.prototype = {

                perPageOptions: [25, 50, 100],

                create: function () {

                    var grid = new Grid();
                    grid.pagination.perPage = perPageOptions[0];
                    return grid;

                },

                setResults: function (results, initial) {

                    this.loading = false;

                    if (this.decorator) {
                        results = this.decorator.decorate(results);
                    }

                    this.results = results;

                    return this;

                },

                setInitResultCount: function (initResultCount) {

                    this.initResultCount = initResultCount;

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
                    // This is going to end up being a problem.

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

                hideAllFilters:function () {

                    var that = this;

                    this.filters.map(function (filter) {
                        filter.isVisible = false;
                    });

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

                disablePagination: function () {

                    this.hidePagination = true;

                    return this;

                },

                allowSelect: function () {

                    this.isSelectable = true;

                    return this;

                },

                allowSelectMany: function () {

                    this.isManySelectable = true;

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

                sortColumn: function (sortColumn, direction, init) {

                    var getParams = $location.search();

                    if (init == undefined) {

                        if (getParams['cOrderBy'] !== undefined) {
                            sortColumn = {name: getParams['cOrderBy']};
                        }

                        if (getParams['cOrderByDirection'] !== undefined) {
                            direction = getParams['cOrderByDirection'];
                        }

                    }

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

                getRequestParams: function () {

                    var params = {};

                    if (this.sortingColumn) {
                        params['cOrderBy'] = this.sortingColumn.name;
                    }

                    if (this.sortDirection) {
                        params['cOrderByDirection'] = this.sortDirection;
                    }

                    if (this.search != '') {
                        params['cSearch'] = this.search;
                    }

                    angular.forEach(this.staticFilters, function (value, key) {
                        params[key] = value;
                    });

                    this.filters.map(function (filter) {
                        angular.forEach(filter.getParams(), function (value, key) {
                            params[key] = value;
                        });
                    });

                    params['cPerPage'] = this.pagination.perPage;
                    params['cPage'] = this.pagination.page;

                    return params;

                },

                removeItem: function (item) {

                    this.removingItems.push(item);
                    this.removingItemIds.push(item.id);

                    if (this.selectItemCallback) {

                        this.selectItemCallback(item);

                    }

                    return this;

                },

                restoreRemovedItem: function (item) {

                    this.removingItems.splice(this.removingItems.indexOf(item), 1);
                    this.removingItemIds.splice(this.removingItemIds.indexOf(item.id), 1);

                    if (this.selectItemCallback) {

                        this.selectItemCallback(null);

                    }

                    return this;

                },

                removeAddingItem: function (item) {

                    this.addingItems.splice(this.addingItems.indexOf(item), 1);
                    this.addingItemIds.splice(this.addingItemIds.indexOf(item.id), 1);

                    if (this.selectItemCallback) {

                        this.selectItemCallback(null);

                    }

                    return this;

                },

                addItem: function (item) {

                    this.addingItems.push(item);
                    this.addingItemIds.push(item.id);

                    if (this.selectItemCallback) {

                        this.selectItemCallback(item);

                    }

                    return this;

                },

                selectItem: function (item, skip) {

                    this.selectedItem = item;
                    this.search = '';

                    if (this.selectItemCallback && skip === undefined) {

                        this.selectItemCallback(item);

                    }

                    return this;

                },

                unselectItem: function (item) {

                    this.selectedItem = null;

                    if (this.selectItemCallback) {

                        this.selectItemCallback(null);

                    }

                    return this;

                },

                setSelectItemCallback: function (callback) {

                    this.selectItemCallback = callback;

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
                },

                setBindToState: function (bindToState) {
                    this.bindToState = bindToState;
                    return this;
                },

                setDecorator: function (decorator) {
                    this.decorator = decorator;

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
