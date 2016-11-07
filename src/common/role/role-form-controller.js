angular.module('role.roleFormCtrl', [])

    .controller('roleFormCtrl', ['$scope', '$uibModalInstance', 'role', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, role, $cbResource, toastr, callback) {

            $scope.role = role ? angular.copy(role) : {};
            $scope.errors = [];
            $scope.roleForm = {};

            $scope.close = function () {

                if ($scope.roleForm.$pristine === false) {
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

                var method = $scope.role.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/role?id[EQ]=' + $scope.role.id
                    : '/role'
                ;

                $cbResource[method](url, $scope.role).then(

                    function (response) {

                        toastr.info('Role ' + method + 'd successfully');
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
