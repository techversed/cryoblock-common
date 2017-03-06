angular.module('admin.adminRoleCtrl', [])

    .controller('adminRoleCtrl', ['$scope', 'roleGrid', '$state',

        function ($scope, roleGrid, $state) {

            $scope.roleGrid = roleGrid;
            $scope.active = 2;

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
