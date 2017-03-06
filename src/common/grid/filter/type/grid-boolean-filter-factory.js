angular.module('grid.gridBooleanFilterFactory', [])

    .factory('gridBooleanFilterFactory', [

        function () {

            var GridBooleanFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridBooleanFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-boolean-filter-tpl.html';

                this.selectionString = 'Any';

                this.isVisible = false;

                this.isFiltering = false;

                this.form = null;

                this.formMapping = {
                    "True": "1",
                    "False": "0",
                    "Any": "Any"
                };

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridBooleanFilter.prototype = {

                refresh: function () {

                    this.form.radioModel = 'Any';
                    this.selectionString = 'Any';
                    this.isFiltering = false;

                },

                updateSelectionString: function () {

                    if (!!this.form.radioModel && this.form.radioModel !== "Any") {

                        this.selectionString = this.form.radioModel;

                        this.isFiltering = true;

                        return;
                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                setFromState: function (boolString) {
                    var that = this;
                    angular.forEach(this.formMapping, function (v, k) {
                        if (v === boolString) {
                            that.form.radioModel = k;
                        }
                    });
                },

                getParams: function () {

                    this.updateSelectionString();

                    var params = {};

                    if (this.form.radioModel === "Any") {

                        return params;

                    }

                    params[this.filterProperty + "[EQ]"] = this.formMapping[this.form.radioModel];

                    return params;

                }

            };

            GridBooleanFilter.create = function (defaults) {
                return new GridBooleanFilter(defaults);
            };

            return GridBooleanFilter;

        }

    ])
;
