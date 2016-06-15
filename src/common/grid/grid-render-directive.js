angular.module('grid.gridRenderDirective', [])
    .directive('gridRender', ['DTOptionsBuilder', 'DTColumnBuilder', 'API', '$compile', '$timeout',

        function (DTOptionsBuilder, DTColumnBuilder, API, $compile, $timeout) {

            return {

                require: ['^gridColumn', '^grid'],
                restrict: 'E',
                link: function (scope, element, attrs, ctrls) {

                    element.hide();

                    var html = element.html();

                    var render = function (data, type, full, meta) {

                        return html;

                    }

                    ctrls[0].column.renderWith(render);

                }

            };

        }

    ])
;
