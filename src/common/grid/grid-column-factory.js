angular.module('grid.gridColumnFactory', [])

    .factory('gridColumnFactory', [

        function () {

            var GridColumn = function (defaults) {

                this.header = null;

                //we could add an onlick option...

                this.bindTo = null;

                this.isSortable = false;

                this.sortDirection = null;

                this.sortDirection = this.sort.NONE;

                this.isVisible = true;

                this.isPrimary = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridColumn.prototype = {

                sort: {
                    ASC: 'ASC',
                    DESC: 'DESC',
                    NONE: 'NONE'
                }

            };

            GridColumn.create = function (defaults) {
                return new GridColumn(defaults);
            };

            return GridColumn;

        }

    ])
;
