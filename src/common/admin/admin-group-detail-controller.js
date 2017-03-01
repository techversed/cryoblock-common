angular.module('admin.adminGroupDetailCtrl', [])

    .controller('adminGroupDetailCtrl', ['$scope', 'group', 'groupFormFactory', 'users', 'roles',

        function ($scope, group, groupFormFactory, users, roles) {


            $scope.group = group;
            $scope.users = users;
            $scope.roles = roles;
            $scope.edit = groupFormFactory.openFormModal;

            $scope.groupTypeIconMapping = {

            };
        }

    ])
;
