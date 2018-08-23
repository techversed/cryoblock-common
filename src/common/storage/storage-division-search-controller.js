angular.module('storage.storageDivisionSearchCtrl', [])

    .controller('storageDivisionSearchCtrl', ['$scope', 'divisionGrid', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q', 'storageFactory', 'storageDivisionManager',

        function ($scope, divisionGrid, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q, storageFactory, storageDivisionManager) {

            $scope.sdm = storageDivisionManager;

            $scope.grid = divisionGrid;


            $scope.goToDivision = function (division) {
                $state.go('storage.division', {id:division.id});
            };


            $scope.isInventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');

            $scope.$on('$destroy', function () {
                $scope.sdm.navigationState = $scope.sdm.navigationStates[0];
            });

        }

    ])
;
