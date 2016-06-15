angular.module('grid.gridHeaderDirective', [])
    .directive('gridHeader', [

        function () {

            return {

                require: '^grid',
                restrict: 'A',
                scope: {
                    name: '@',
                    sortable: '=',
                },
                link: function (scope, element, attrs, gridCtrl) {

                    var gridHeader = this;

                    element.addClass('grid-header');

                    var column = {
                        name: scope.name,
                        sortable: scope.sortable
                    };

                    // add column to the grid control
                    gridCtrl.addColumn(column);

                    if (typeof scope.sortable === 'undefined') {
                        scope.sortable = true;
                    }

                    if (true === scope.sortable) {
                        element.addClass('sorting');
                    }

                    // toggle sorting classes
                    element.on('click', function () {

                        if (element.hasClass('sorting')) {

                            element.removeClass('sorting').addClass('sorting_desc');

                            gridCtrl.setSortColumn(column, 'DESC');

                        }
                        else if (element.hasClass('sorting_asc')) {

                            element.removeClass('sorting_asc').addClass('sorting_desc');

                            gridCtrl.setSortColumn(column, 'DESC');

                        }
                        else if (element.hasClass('sorting_desc')) {

                            element.removeClass('sorting_desc').addClass('sorting_asc');

                            gridCtrl.setSortColumn(column, 'ASC');

                        }

                    });

                    // on grid sort remove sorting classes if the current column sorting
                    // is not the column in question
                    scope.$on('grid.sort', function (event, data, test) {

                        if (data.name !== scope.name) {

                            element.removeClass('sorting_asc').removeClass('sorting_desc').addClass('sorting');

                        }

                    });

                }
            };

        }

    ])
;
