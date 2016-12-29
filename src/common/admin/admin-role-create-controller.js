angular.module('admin.roleCreateCtrl', [])
    .controller('roleCreateCtrl', ['$scope', 'adminFactory', 'toastr', '$state',

        function ($scope, adminFactory, toastr, $state) {

            $scope.role = {};
            $scope.errors = [];

            $scope.submit = function (isValid) {

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                adminFactory.createRole($scope.role).then(

                    function (response) {

                        toastr.info('Role created successfully');

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
