angular.module('storage.storageFlagDivisionFormCtrl', [])

    .controller('storageFlagDivisionFormCtrl', ['$scope', '$uibModalInstance', 'division', '$cbResource', 'toastr',

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

                var url = '/storage/box-flag?id[EQ]=' + $scope.division.id;

                $cbResource[method](url, $scope.division).then(

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
