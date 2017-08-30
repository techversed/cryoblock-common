angular.module('storage.storageSampleLinkCtrl', [])

    .controller('storageSampleLinkCtrl', ['$scope', 'samples', '$uibModalInstance', '$cbResource', 'toastr', 'callBack', '$state', 'sessionFactory', 'storageDivisionManager', 'sampleGrid',

        function ($scope, samples, $modalInstance, $cbResource, toastr, callBack, $state, sessionFactory, storageDivisionManager, sampleGrid) {

            $scope.samples = samples;
            $scope.sample = {};
            $scope.sampleGrid = sampleGrid;

            $scope.close = function () {

                $modalInstance.close();

            };

            $scope.submit = function () {

                console.log($scope.sample.sample);

                callBack($scope.sample.sample);

            }

        }

    ])
;
