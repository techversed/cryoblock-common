angular.module('admin.userCreateCtrl', [])
    .controller('userCreateCtrl', ['$scope', 'adminFactory', 'toastr', '$state',

        function ($scope, adminFactory, toastr, $state) {

            $scope.user = {};
            $scope.errors = [];

            $scope.submit = function (isValid) {

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                adminFactory.createUser($scope.user).then(

                    function (response) {

                        toastr.info('User created successfully');

                        $state.go('admin.index');

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }
                );

            }
        }

    ])
;
