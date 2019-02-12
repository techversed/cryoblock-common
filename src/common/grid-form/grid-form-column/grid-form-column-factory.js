angular.module('gridForm.gridFormColumn.gridFormColumnFactory', [])

    .factory('gridFormColumnFactory', [

        function () {

            var GridFormColumn = function (defaults) {

                this.header = null;

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

            GridFormColumn.prototype = {

                sort: {
                    ASC: 'ASC',
                    DESC: 'DESC',
                    NONE: 'NONE'
                }

            };

            GridFormColumn.create = function (defaults) {
                return new GridFormColumn(defaults);
            };

            return GridFormColumn;

        }

    ])
;
