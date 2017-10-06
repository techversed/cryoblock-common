angular.module('storage.storageBoxFlagDivisionFormCtrl', [])

    .controller('storageBoxFlagDivisionFormCtrl', ['$scope', '$uibModalInstance', 'division', '$cbResource', 'toastr', 'callback', 'boxFlags',

        function ($scope, $modalInstance, division, $cbResource, toastr, callback, boxFlags) {

            $scope.boxFlags = boxFlags.data;
            $scope.division = angular.copy(division);

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
