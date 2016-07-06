angular.module('grid.gridStringFilterFactory', [])

    .factory('gridStringFilterFactory', [

        function () {

            var GridStringFilter = function (defaults) {

                this.results = [];

                this.filterProperty = null;

                this.title = null;

                this.controllerName = 'gridStringFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-string-filter-tpl.html';

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

                getParams: function () {

                    var params = [];

                    var that = this;
                    this.selectedItems.map(function (item) {
                        params.push(that.filterProperty + '[IN][]=' + item[that.accessProperty]);
                    });

                    return params;

                },

                clear: function () {

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
