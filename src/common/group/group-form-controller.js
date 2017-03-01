angular.module('group.groupFormCtrl', [])

    .controller('groupFormCtrl', ['$scope', '$uibModalInstance', 'group', 'roles', 'roleSelectGrid', 'users', 'userSelectGrid', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, group, roles, roleSelectGrid, users, userSelectGrid, $cbResource, toastr, callback) {

            $scope.group = group ? angular.copy(group) : {};
            $scope.errors = [];
            $scope.groupForm = {};
            $scope.roles = roles;
            $scope.users = users;
            $scope.roleSelectGrid = roleSelectGrid;
            $scope.userSelectGrid = userSelectGrid;

            $scope.close = function () {

                if ($scope.groupForm.$pristine === false) {
                    console.log('not pristine');

                }

                $modalInstance.close();

            };


            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                var method = $scope.group.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/group?id[EQ]=' + $scope.group.id
                    : '/group'
                ;

                $cbResource[method](url, $scope.group).then(

                    function (response) {

                        toastr.info('Group ' + method + 'd successfully');
                        $scope.close();
                        callback();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            }

        }

    ])
;
