angular.module('storage.storageSampleMoveCtrl', [])

    .controller('storageSampleMoveCtrl', ['$scope', 'sampleMoveMap', 'callback', 'storageFactory', 'toastr',

        function ($scope, sampleMoveMap, callback, storageFactory, toastr) {

            $scope.sampleMoveMap = sampleMoveMap;

            $scope.confirm = function () {

                storageFactory.moveSamples($scope.sampleMoveMap).then(
                    function () {
                        toastr.success('Samples moved successfully');
                        $scope.$close();
                    },
                    function () {
                        toastr.danger('An error occured making your request, please try again later');
                        $scope.$dismiss();
                    }
                );

            };

        }

    ])
;
