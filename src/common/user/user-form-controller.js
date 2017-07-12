angular.module('user.userFormCtrl', [])

    .controller('userFormCtrl', ['$scope', '$uibModalInstance', 'user', 'groupGrids', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, user, groupGrids, $cbResource, toastr, callback) {

            $scope.user = user ? angular.copy(user) : {};
            $scope.errors = [];
            $scope.userForm = {};
            $scope.groups = groupGrids[0];
            $scope.groupSelectGrid = groupGrids[1];
            $scope.allowEnable = !$scope.user.enabled;

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

                        toastr.info('User ' + method + 'd successfully');
                        $scope.$close();
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
