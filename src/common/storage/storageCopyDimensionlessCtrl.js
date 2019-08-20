/*

    We need to move away from having this separate controller for this -- I would really like to move this into storage division manager if possible but I may still need to pop a modal in order to select count.

    This should paste the copied sample instead of the one selected in a row action
    There should be a copied sample emblem even when the user is in dimensionless view.


*/

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

                $cbResource.create('/storage/sample/' + $scope.sample.id + ' /clone', {count:$scope.formProps.copyCount, divisionId: $scope.division.id}).then(function () {
                    $scope.$close();
                    toastr.info('Sample ' + $scope.sample.id + ' copied successfully.');
                    $state.go($state.current, $stateParams, {reload:true});
                });

            };

        }

    ])
;
