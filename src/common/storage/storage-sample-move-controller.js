angular.module('storage.storageSampleMoveCtrl', [])

    .controller('storageSampleMoveCtrl', ['$scope', 'sampleMoveMap', 'callback', 'storageFactory', 'toastr', 'division',

        function ($scope, sampleMoveMap, callback, storageFactory, toastr, division) {

            $scope.sampleMoveMap = sampleMoveMap;

            $scope.confirm = function () {

                storageFactory.moveSamples($scope.sampleMoveMap, division).then(
                    function () {
                        toastr.success('Samples moved successfully');
                        $scope.$close();
                    },
                    function () {
                        $scope.$dismiss();
                    }
                );

            };

        }

    ])
;
