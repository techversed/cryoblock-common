angular.module('admin.adminUserDetailCtrl', [])

    .controller('adminUserDetailCtrl', ['$scope', 'user', 'userFormFactory', 'groups',

        function ($scope, user, userFormFactory, groups) {

            $scope.user = user;
            $scope.groups = groups;
            $scope.edit = userFormFactory.openFormModal;

        }

    ])
;
