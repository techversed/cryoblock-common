angular.module('grid.gridTimeFilterFactory', [])

    .factory('gridTimeFilterFactory', [

        function () {

            var GridTimeFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridTimeFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-time-filter-tpl.html';

                this.selectionString = 'Any';

                this.isVisible = false;

                this.isFiltering = false;

                this.time = [];

                this.selectedItems = [];

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridTimeFilter.prototype = {

                selectItem: function (item) {

                    this.selectedItems.push(item);

                    this.time.splice(this.time.indexOf(item), 1);

                    this.isFiltering = true;

                    this.updateSelectionString();

                },

                removeItem: function (item) {

                    this.time.push(item);

                    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);

                    this.isFiltering = this.selectedItems.length !== 0;

                    this.updateSelectionString();

                },

                updateSelectionString: function () {

                    if (this.selectedItems.length === 0) {

                        this.selectionString = 'Any';

                        return;
                    }

                    this.selectionString = this.selectedItems.join(', ');

                },

                getParams: function () {

                    var params = {};

                    if (this.selectedItems.length) {

                        params[this.filterProperty + '[IN]'] = this.selectedItems.map(function (item) {
                            return item;
                        });

                    }

                    return params;

                },

                clear: function () {

                    this.time = this.time.concat(this.selectedItems);
                    this.selectedItems = [];
                    this.isFiltering = false;
                    this.updateSelectionString();

                }

            };

            GridTimeFilter.create = function (defaults) {
                return new GridTimeFilter(defaults);
            };

            return GridTimeFilter;

        }

    ])
;
