angular.module('grid.gridColumnDirective', [])
    .directive('gridColumn', [

        function () {

            return {

                restrict: 'A',
                scope: {
                    column: '=',
                    columnSrc: '='
                },
                link: function ($scope, element, attrs) {
                    console.log($scope.column.bindTo);
                }

            };

        }

    ])
;
