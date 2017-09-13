angular.module('storage.cbBoxGridInfoDirective', [])
    .directive('cbBoxGridInfo', ['sessionFactory', 'API', '$rootScope',
        function (sessionFactory, API, $rootScope) {
            return {
                restrict: 'E',
                sample: 'E',
                templateUrl: 'common/storage/partials/cb-box-grid-info-tpl.html',
                link: function ($scope) {
                }
            }
        }
    ])
;
