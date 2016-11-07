angular.module('admin.adminRoleCtrl', [])

    .controller('adminRoleCtrl', ['$scope', 'roleGrid', 'roleFormFactory', '$state',

        function ($scope, roleGrid, roleFormFactory, $state) {

            $scope.roleGrid = roleGrid;
            $scope.active = 2;

            $scope.createRole = function () {
                roleFormFactory.openFormModal();
            };

            $scope.navigateToUsers = function ($event) {
                $state.go('admin.user');
            };

            $scope.navigateToGroups = function ($event) {
                console.log('nav to group');
                $state.go('admin.group');
            };
        }

    ])
;
