angular.module('grid.gridStringFilterFactory', [])

    .factory('gridStringFilterFactory', [

        function () {

            var GridStringFilter = function (defaults) {

                this.results = [];

                this.selectedItems = [];

                this.filterProperty = null;

                this.title = null;

                this.selectedItemsString = 'Any';

                this.bindTo = null;

                this.controllerName = 'gridStringFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-relation-filter-tpl.html';

                this.isVisible = false;

                this.isFiltering = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridStringFilter.prototype = {

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

                    var params = [];

                    var that = this;
                    this.selectedItems.map(function (item) {
                        params.push(that.filterProperty + '[IN][]=' + item[that.accessProperty]);
                    });

                    return params;

                },

                clear: function () {

                    this.selectedItems = [];
                    this.updateSelectedItemsString();
                    this.isFiltering = false;

                }

            };

            GridStringFilter.create = function (defaults) {
                return new GridStringFilter(defaults);
            };

            return GridStringFilter;

        }

    ])
;