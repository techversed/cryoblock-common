angular.module('admin.adminUserCtrl', [])

    .controller('adminUserCtrl', ['$scope', 'userGrid', 'userFormFactory', '$state',

        function ($scope, userGrid, userFormFactory, $state) {

            $scope.userGrid = userGrid;
            $scope.active = 0;

            $scope.createUser = function () {
                userFormFactory.openFormModal();
            };

            $scope.navigateToGroups = function () {
                $state.go('admin.group');
            };

            $scope.navigateToRoles = function () {
                $state.go('admin.role');
            };

        }

    ])
;
