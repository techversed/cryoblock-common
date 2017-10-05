angular.module('storage.storageBoxFlagDivisionFormCtrl', [])

    .controller('storageBoxFlagDivisionFormCtrl', ['$scope', '$uibModalInstance', 'division', '$cbResource', 'toastr',

        function ($scope, $modalInstance, division, $cbResource, toastr) {

            $scope.division = division;


            $scope.close = function () {
                $modalInstance.close();
            };

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                var url = '/storage/division?id[EQ]=' + $scope.division.id;

                $cbResource.update(url, $scope.division).then(

                    function (response) {

                        toastr.info('Box flagged successfully');
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
