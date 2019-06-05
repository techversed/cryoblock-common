angular.module('storage.storageDivisionSearchCtrl', [])

/*

    We really need to separate the search view from the regular division view because it is making it so that the grid results need to be loaded every time a user requests a division page.


*/

    .controller('storageDivisionSearchCtrl', ['$scope', '$window', 'divisionGrid', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q', 'storageFactory', 'storageDivisionManager', '$stateParams',

        function ($scope, $window, divisionGrid, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q, storageFactory, storageDivisionManager, $stateParams) {

            $scope.grid =  divisionGrid;
            $scope.inventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');
            $scope.sdm = storageDivisionManager;
            $scope.sdm.toggleSearch = true;

        }

    ])
;
