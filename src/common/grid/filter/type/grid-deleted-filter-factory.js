angular.module('grid.gridDeletedFilterFactory', [])

    .factory('gridDeletedFilterFactory', [

        function () {

            var GridStringFilter = function (defaults) {

                this.filterProperty = null;

                this.title = null;

                this.controllerName = 'gridDeletedFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-deleted-filter-tpl.html';

                this.selectionString = 'No';

                this.isVisible = true;

                this.isFiltering = false;

                this.showDeleted = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridStringFilter.prototype = {

                refresh: function () {

                    this.showDeleted = false;
                    this.isFiltering = false;

                },

                updateSelectionString: function () {

                    if (!!this.showDeleted) {

                        this.selectionString = 'Yes'

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'No';

                },

                getParams: function () {

                    this.updateSelectionString();

                    var params = {};

                    if (!this.showDeleted) {

                        return params;

                    }

                    params[this.filterProperty] = this.showDeleted;
                    params['deletedAt[EXISTS]'] = true;

                    return params;

                },

                clear: function () {

                    this.refresh();

                }

            };

            GridStringFilter.create = function (defaults) {
                return new GridStringFilter(defaults);
            };

            return GridStringFilter;

        }

    ])
;
