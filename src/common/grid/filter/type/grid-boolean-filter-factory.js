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
                    "Yes": "1",
                    "No": "0",
                    "Any": "Any"
                };

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridBooleanFilter.prototype = {

                refresh: function () {
                    console.log("testing");

                    console.log(this.form.radioModel);
                    if (this.form.radioModel == undefined || this.form.radioModel == 'Any') {
                        this.form.radioModel = 'Yes';
                        this.updateSelectionString();
                        this.selectionString = 'Yes';
                        this.isFiltering = false;
                    }

                },

                updateSelectionString: function () {
                    console.log("update selection string");
                    if (!!this.form.radioModel && this.form.radioModel != "Any") {

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
                    console.log(this.form);
                    console.log('get params');

                    this.updateSelectionString();

                    var params = {};

                    if (this.form.radioModel === "Any") {
                        console.log("params", params);

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
