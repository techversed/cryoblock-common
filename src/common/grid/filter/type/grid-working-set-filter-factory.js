angular.module('grid.gridWorkingSetFilterFactory', [])

    .factory('gridWorkingSetFilterFactory', [

        function () {

            var GridWorkingSetFilter = function (defaults) {

                this.results = [];

                this.selectedItems = [];

                this.filterProperty = null;

                this.title = null;

                this.selectedItemsString = 'Any';

                this.bindTo = null;

                this.controllerName = 'gridWorkingSetFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-working-set-filter-tpl.html';

                this.isVisible = false;

                this.isFiltering = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridWorkingSetFilter.prototype = {

                setResults: function (results) {
                    this.results = results;
                },

                selectItem: function (item) {

                    this.selectedItems.push(item);

                    this.results.splice(this.results.indexOf(item), 1);

                    this.isFiltering = true;

                    this.updateSelectedItemsString();

                },

                removeItem: function (item) {

                    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);

                    this.isFiltering = this.selectedItems.length !== 0;

                    this.updateSelectedItemsString();

                },

                updateSelectedItemsString: function () {

                    if (this.selectedItems.length === 0) {

                        this.selectedItemsString = 'Any';

                        return;
                    }

                    var that = this;

                    this.selectedItemsString = this.selectedItems.map(function(item) {
                        return item[that.bindTo];
                    }).join(', ');

                },

                getParams: function () {

                    var params = {};

                    var that = this;
                    var itemValues = this.selectedItems.map(function (item) {
                        return item[that.accessProperty]
                    });

                    if (itemValues.length) {
                        params[this.filterProperty + '[IN]'] = itemValues;
                    }

                    return params;

                },

                clear: function () {

                    this.selectedItems = [];
                    this.updateSelectedItemsString();
                    this.isFiltering = false;

                }

            };

            GridWorkingSetFilter.create = function (defaults) {
                return new GridWorkingSetFilter(defaults);
            };

            return GridWorkingSetFilter;

        }

    ])
;
