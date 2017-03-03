angular.module('admin.adminRoleDetailCtrl', [])

    .controller('adminRoleDetailCtrl', ['$scope', 'role', 'groups',

        function ($scope, role, groups) {

            $scope.role = role;
            $scope.groups = groups;

        }

    ])
;
