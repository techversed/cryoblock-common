angular.module('storage.storageDivisionSearchCtrl', [])
    .controller('storageDivisionSearchCtrl', ['$scope', '$window', 'divisionGrid', 'sessionFactory', 'storageDivisionManager',

        function ($scope, $window, divisionGrid, sessionFactory, storageDivisionManager) {

            $scope.grid =  divisionGrid;
            $scope.inventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');
            $scope.sdm = storageDivisionManager;
            $scope.sdm.toggleSearch = true;

        }

    ])
;
