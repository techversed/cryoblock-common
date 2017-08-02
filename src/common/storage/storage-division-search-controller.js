angular.module('storage.storageDivisionSearchCtrl', [])

    .controller('storageDivisionSearchCtrl', ['$scope', 'divisions', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q', 'storageFactory', 'storageDivisionManager',

        function ($scope, divisions, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q, storageFactory, storageDivisionManager) {

            $scope.sdm = storageDivisionManager;

            $scope.divisions = divisions;
            console.log($scope.divisions)
            console.log($scope.divisions.[0].children)


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
