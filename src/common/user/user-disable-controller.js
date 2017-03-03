angular.module('user.userDisableCtrl', [])

    .controller('userDisableCtrl', ['$scope', '$uibModalInstance', 'user', '$cbResource', 'toastr', 'callback',

        function ($scope, $modalInstance, user, $cbResource, toastr, callback) {

            $scope.user = user ? angular.copy(user) : {};
            $scope.errors = [];
            $scope.userForm = {};

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                $cbResource.delete('/user', {id:$scope.user.id}).then(


                    function (response) {

                        toastr.info('User disabled successfully');
                        $modalInstance.close();
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
