angular.module('grid.gridTimeFilterFactory', [])

    .factory('gridTimeFilterFactory', [

        function () {

            var GridTimeFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridTimeFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-time-filter-tpl.html';

                this.selectedOperator = this.operators[0];

                this.withinUnit = this.units[0];

                this.moreUnit = this.units[0];

                this.selectionString = 'Any';

                this.selectedType = '';

                this.withinDate = '';

                this.moreDate = '';

                this.startDate = '';

                this.endDate = '';

                this.isVisible = false;

                this.isFiltering = false;

                this.selectedType = [];

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridTimeFilter.prototype = {

                operators: [
                    {
                        value: 'withinLast',
                        name: '<='
                    },
                    {
                        value: 'moreThan',
                        name: '>='
                    },
                ],
                units: [
                    {
                        value: 'hours',
                        name: 'hours'
                    },
                    {
                        value: 'days',
                        name: 'days'
                    },
                    {
                        value: 'weeks',
                        name: 'weeks'
                    },
                    {
                        value: 'months',
                        name: 'months'
                    },
                ],

                selectType: function (type) {

                    this.selectedType.push(type);

                    this.time.splice(this.time.indexOf(type), 1);

                    this.isFiltering = true;

                    this.updateSelectionString();

                },

                removeItem: function (item) {

                    this.time.push(item);

                    this.selectedType.splice(this.selectedType.indexOf(item), 1);

                    this.isFiltering = this.selectedType.length !== 0;

                    this.updateSelectionString();

                },

                updateSelectionString: function () {

                    if (this.selectedType === 'within' && !!this.withinDate && !!this.withinUnit) {

                        this.selectionString = this.selectedOperator.name + ' ' + this.withinDate + ' ' + this.withinUnit.name;

                        this.isFiltering = true;

                        return;

                    }

                    if (this.selectedType === 'more' && !!this.moreDate && !!this.moreUnit) {

                        this.selectionString = this.selectedOperator.name + ' ' + this.moreDate + ' ' + this.moreUnit.name;

                        this.isFiltering = true;

                        return;

                    }

                    if (this.selectedType === 'between' && !!this.startDate && !!this.endDate) {

                        this.selectionString = this.operators[1].name + ' ' + this.startDate + ' ' + this.operators[0].name + ' ' + this.endDate;

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                getParams: function () {

                    this.updateSelectionString();

                    var params = {};
// dates should be a calculated epic date maybe
                    if (this.selectedType === 'within' && !!this.withinDate) {

                        params[this.filterProperty + '[' + this.selectedOperator.value + ']'] = this.withinDate;

                    }

                    if (this.selectedType === 'more' && !!this.moreDate) {

                        params[this.filterProperty + '[' + this.selectedOperator.value + ']'] = this.moreDate;

                    }

                    if (this.selectedType === 'between' && !!this.startDate && !!this.endDate) {

                        params[this.filterProperty + '[' + this.operators[1].value + ']'] = this.startDate;

                        params[this.filterProperty + '[' + this.operators[0].value + ']'] = this.endDate;

                    }

                    return params;

                },

                clear: function () {

                    this.time = this.time.concat(this.selectedType);
                    this.selectedType = [];
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
