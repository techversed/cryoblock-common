angular.module('storage.storageTitleDirective', [])
    .directive('storageTitleDirective', ['sessionFactory', 'API', '$rootScope',
        function (sessionFactory, API, $rootScope) {
            return {
                restrict: 'E',
                user: 'E',
                templateUrl: 'common/storage/partials/storage-title-directive-tpl.html',
                scope: {
                    division: '='
                },
                link: function ($scope) {

                }
            }
        }
    ])
;
