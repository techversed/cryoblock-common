angular.module('admin.adminUserCtrl', [])

    .controller('adminUserCtrl', ['$scope', 'userGrid', 'userFormFactory', '$state', '$window',

        function ($scope, userGrid, userFormFactory, $state, $window) {

            $window.scroll(0,0);

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
