angular.module('storage.storageCopyDimensionlessCtrl', [])

    .controller('storageCopyDimensionlessCtrl', ['$scope', 'sample', 'division', '$cbResource', 'toastr', '$state', '$stateParams',

        function ($scope, sample, division, $cbResource, toastr, $state, $stateParams) {

            $scope.sample = sample;
            $scope.division = division;
            $scope.storageCopyDimensionless = {};
            $scope.formProps = {copyCount:1};

            $scope.confirm = function (storageCopyDimensionlessForm) {

                if (!storageCopyDimensionlessForm.$valid) {

                    return;

                }

                $cbResource.create('/storage/sample/' + $scope.sample.id + ' /clone', {count:$scope.formProps.copyCount}).then(function () {
                    $scope.$close();
                    toastr.info('Sample ' + $scope.sample.id + ' copied successfully.');
                    $state.go($state.current, $stateParams, {reload:true});
                });

            };

        }

    ])
;
