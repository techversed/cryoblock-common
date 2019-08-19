angular.module('grid.gridIntegerFilterFactory', [])

    .factory('gridIntegerFilterFactory', [

        function () {

            var GridIntegerFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridIntegerFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-integer-filter-tpl.html';

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
                    },
                    {
                        value: 'EQ',
                        name: '='
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

                    // The previous check here was selected== singe && !!this.singleValue -- this evaluated to true when 0 was given ... this should fix that issue but it is also possible that there are situations which I have failed to account for...
                    if (this.selectedType === 'single' && !(this.singleValue === '') ) {

                        this.selectionString = this.selectedOperator.name + ' ' + this.singleValue;

                        this.isFiltering = true;

                        return;

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.betweenEnd) {

                        this.selectionString = this.operators[1].name + ' ' + this.betweenStart + ' ' + this.operators[0].name + ' ' + this.betweenEnd;

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                getParams: function () {

                    this.updateSelectionString();

                    var params = {};

                    // The previous check here was selected== singe && !!this.singleValue -- this evaluated to true when 0 was given ... this should fix that issue but it is also possible that there are situations which I have failed to account for...
                    if (this.selectedType === 'single' && !(this.singleValue === '') ) {

                        params[this.filterProperty + '[' + this.selectedOperator.value + ']'] = this.singleValue;

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.betweenEnd) {

                        params[this.filterProperty + '[' + this.operators[1].value + ']'] = this.betweenStart;

                        params[this.filterProperty + '[' + this.operators[0].value + ']'] = this.betweenEnd;

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
