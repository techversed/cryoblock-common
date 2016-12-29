angular.module('admin.groupCreateCtrl', [])
    .controller('groupCreateCtrl', ['$scope', 'adminFactory', 'toastr', '$state',

        function ($scope, adminFactory, toastr, $state) {

            $scope.group = {};
            $scope.errors = [];

            $scope.submit = function (isValid) {

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                adminFactory.createGroup($scope.group).then(

                    function (response) {

                        toastr.info('Group created successfully');

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
