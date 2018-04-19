angular.module('storage.cbBoxGridInfoDirective', [])
    .directive('cbBoxGridInfo', ['sessionFactory', 'API', '$rootScope', 'storageParams',
        function (sessionFactory, API, $rootScope, storageParams) {

            var templatePath = (storageParams && storageParams.boxGridInfoTemplate) ? storageParams.boxGridInfoTemplate : "common/storage/partials/cb-box-grid-info-tpl.html";

            return {
                restrict: 'E',
                scope: {sample:'='},
                templateUrl: templatePath
            }

        }
    ])
;
