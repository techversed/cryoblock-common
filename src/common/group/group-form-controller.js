angular.module('group.groupFormCtrl', [])

    .controller('groupFormCtrl', ['$scope', '$uibModalInstance', 'group', 'roleGrids', 'userGrids', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, group, roleGrids, userGrids, $cbResource, toastr, callback) {

            $scope.group = group ? angular.copy(group) : {};
            $scope.errors = [];
            $scope.groupForm = {};
            $scope.roles = roleGrids[0];
            $scope.roleSelectGrid = roleGrids[1];
            $scope.users = userGrids[0];
            $scope.userSelectGrid = userGrids[1];

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
