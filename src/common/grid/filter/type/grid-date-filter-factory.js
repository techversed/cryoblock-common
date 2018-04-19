angular.module('grid.gridDateFilterFactory', [])

    .factory('gridDateFilterFactory', [

        function () {

            var GridIntegerFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridDateFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-date-filter-tpl.html';

                this.selectedOperator = this.operators[0];

                this.selectedType = 'single';

                this.singleValue = '';

                this.betweenStart = '';

                this.betweenEnd = '';

                this.selectionString = 'Any';

                this.isVisible = false;

                this.isFiltering = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridIntegerFilter.prototype = {

                operators: [
                    {
                        value: 'LTE',
                        name: '<='
                    },
                    {
                        value: 'GTE',
                        name: '>='
                    }
                ],

                refresh: function () {

                    this.selectedType = 'single';
                    this.singleValue = '';
                    this.selectedOperator = this.operators[0];
                    this.betweenStart = '';
                    this.betweenEnd = '';
                    this.isFiltering = false;

                },

                updateSelectionString: function () {

                    if (this.selectedType === 'single' && !!this.singleValue) {

                        this.selectionString = this.selectedOperator.name + ' ' + moment(this.singleValue).format('YYYY-MM-DD');;

                        this.isFiltering = true;

                        return;

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.betweenEnd) {

                        this.selectionString = this.operators[1].name + ' ' + moment(this.betweenStart).format('YYYY-MM-DD') + ' ' + this.operators[0].name + ' ' + moment(this.betweenEnd).format('YYYY-MM-DD');

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                getParams: function () {

                    this.updateSelectionString();

                    var params = {};

                    if (this.selectedType === 'single' && !!this.singleValue) {

                        params[this.filterProperty + '[' + this.selectedOperator.value + ']'] = moment(this.singleValue).format('YYYY-MM-DD');

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.betweenEnd) {

                        params[this.filterProperty + '[' + this.operators[1].value + ']'] = moment(this.betweenStart).format('YYYY-MM-DD');

                        params[this.filterProperty + '[' + this.operators[0].value + ']'] = moment(this.betweenEnd).format('YYYY-MM-DD');

                    }

                    return params;

                }

            };

            GridIntegerFilter.create = function (defaults) {
                return new GridIntegerFilter(defaults);
            };

            return GridIntegerFilter;

        }

    ])
;
