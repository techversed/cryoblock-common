angular.module('storage.catalog.catalogIndexCtrl', [])

    .controller('catalogIndexCtrl', ['$scope', 'grid', '$window',

        function ($scope, grid, $window) {

            $window.scroll(0,0);

            $scope.grid = grid;

            $scope.linky = function () {
                window.open(
                    'https://crowelab-utilities.service.vumc.org/#/target/index',
                    '_blank' // <- This is what makes it open in a new window.
                );
            };

            $scope.linky2 = function () {
                window.open(
                    'https://crowelab-utilities.service.vumc.org/#/donor/donor/index',
                    '_blank' // <- This is what makes it open in a new window.
                );
            };

            $scope.linky3 = function () {
                window.open(
                    'https://crowelab-utilities.service.vumc.org/#/production/human-specimen-request/index',
                    '_blank' // <- This is what makes it open in a new window.
                );
            };

        }

    ])
;
