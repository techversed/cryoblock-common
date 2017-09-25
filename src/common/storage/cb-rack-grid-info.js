angular.module('storage.cbRackGridInfoDirective', [])
    .directive('cbRackGridInfo', ['sessionFactory', 'API', '$rootScope', 'storageParams',
        function (sessionFactory, API, $rootScope, storageParams) {

            var templatePath = (storageParams && storageParams.rackGridInfoTemplate) ? storageParams.rackGridInfoTemplate : "common/storage/partials/cb-rack-grid-info-tpl.html";

            return {
                restrict: 'E',
                scope: {division:'='},
                templateUrl: templatePath
            }

        }
    ])
;
