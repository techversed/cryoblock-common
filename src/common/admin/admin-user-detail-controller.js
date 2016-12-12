angular.module('admin.adminUserDetailCtrl', [])

    .controller('adminUserDetailCtrl', ['$scope', 'user', 'userFormFactory',

        function ($scope, user, userFormFactory) {

            $scope.user = user;
            // $scope.linkedGroupsGrid = linkedGroupsGrid;
            $scope.edit = userFormFactory.openUserFormModal;

            $scope.userTypeIconMapping = {

            };

            // $scope.iconFile = $scope.userTypeIconMapping[$scope.user.userType.name];

        }

    ])
;
