angular.module('grid.gridEnumFilterFactory', [])

    .factory('gridEnumFilterFactory', [

        function () {

            var GridEnumFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridEnumFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-enum-filter-tpl.html';

                this.selectionString = 'Any';

                this.isVisible = false;

                this.isFiltering = false;

                this.enum = [];

                this.selectedItems = [];

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridEnumFilter.prototype = {

                selectItem: function (item) {

                    this.selectedItems.push(item);

                    this.enum.splice(this.enum.indexOf(item), 1);

                    this.isFiltering = true;

                    this.updateSelectionString();

                },

                removeItem: function (item) {

                    this.enum.push(item);

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

                    this.enum = this.enum.concat(this.selectedItems);
                    this.selectedItems = [];
                    this.isFiltering = false;
                    this.updateSelectionString();

                }

            };

            GridEnumFilter.create = function (defaults) {
                return new GridEnumFilter(defaults);
            };

            return GridEnumFilter;

        }

    ])
;
