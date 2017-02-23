angular.module('user.userFormCtrl', [])

    .controller('userFormCtrl', ['$scope', '$uibModalInstance', 'user', 'groups', 'groupSelectGrid', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, user, groups, groupSelectGrid, $cbResource, toastr, callback) {

            $scope.user = user ? angular.copy(user) : {};
            $scope.errors = [];
            $scope.userForm = {};
            $scope.groups = groups;
            $scope.groupSelectGrid = groupSelectGrid;

            $scope.close = function () {

                if ($scope.userForm.$pristine === false) {
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

                var method = $scope.user.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/user?id[EQ]=' + $scope.user.id
                    : '/user'
                ;

                $cbResource[method](url, $scope.user).then(

                    function (response) {

                        toastr.info('Sample ' + method + 'd successfully');
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
