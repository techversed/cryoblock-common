angular.module('admin.adminRoleCtrl', [])

    .controller('adminRoleCtrl', ['$scope', 'roleGrid', '$state', '$window',

        function ($scope, roleGrid, $state, $window) {

            $window.scroll(0,0);

            $scope.roleGrid = roleGrid;
            $scope.active = 2;

            $scope.navigateToUsers = function ($event) {
                $state.go('admin.user');
            };

            $scope.navigateToGroups = function ($event) {
                $state.go('admin.group');
            };
        }

    ])
;
