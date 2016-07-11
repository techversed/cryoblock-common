angular.module('grid.gridStringFilterFactory', [])

    .factory('gridStringFilterFactory', [

        function () {

            var GridStringFilter = function (defaults) {

                this.filterProperty = null;

                this.title = null;

                this.controllerName = 'gridStringFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-string-filter-tpl.html';

                this.selectionString = 'Any';

                this.selectedOperator = this.operators[0];

                this.singleValue = '';

                this.isVisible = true;

                this.isFiltering = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridStringFilter.prototype = {

                operators: [
                    {
                        value: 'LIKE',
                        name: 'LIKE'
                    },
                    {
                        value: 'EQ',
                        name: '='
                    }
                ],

                refresh: function () {

                    this.singleValue = '';
                    this.selectedOperator = this.operators[0];
                    this.isFiltering = false;

                },

                updateSelectionString: function () {

                    if (!!this.singleValue) {

                        this.selectionString = this.selectedOperator.name + ' ' + this.singleValue;

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                getParams: function () {

                    this.updateSelectionString();

                    if (!this.singleValue) {

                        return [];

                    }

                    return this.filterProperty + '[' + this.selectedOperator.value + ']=' + this.singleValue;
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
