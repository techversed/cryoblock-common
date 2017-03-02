angular.module('user.userDisableCtrl', [])

    .controller('userDisableCtrl', ['$scope', '$uibModalInstance', 'user', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, user, $cbResource, toastr, callback) {

            $scope.user = user ? angular.copy(user) : {};
            $scope.errors = [];
            $scope.userForm = {};

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

                var method = 'delete'
                var url = '/user?id[EQ]=' + $scope.user.id;

                $cbResource[method](url, $scope.user).then(

                    function (response) {

                        toastr.info('User disabled successfully');
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
