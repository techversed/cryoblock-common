angular.module('admin.adminRoleDetailCtrl', [])

    .controller('adminRoleDetailCtrl', ['$scope', 'role', 'roleFormFactory',

        function ($scope, role, roleFormFactory) {

            $scope.role = role;
            // $scope.linkedRolesGrid = linkedRolesGrid;
            $scope.edit = roleFormFactory.openRoleFormModal;

            $scope.roleTypeIconMapping = {

            };

            // $scope.iconFile = $scope.roleTypeIconMapping[$scope.role.roleType.name];

        }

    ])
;
