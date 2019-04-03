angular.module('storage.storageSampleLinkCtrl', [])

    // removed storage division manager from this because it is not used within the script that we are handling.

    .controller('storageSampleLinkCtrl', ['$scope', 'samples', 'selectedCells', 'division', '$uibModalInstance', '$cbResource', 'callBack', 'sampleGrid',

        function ($scope, samples, selectedCells, division, $modalInstance, $cbResource, callBack, sampleGrid) {

            $scope.samples = samples;
            $scope.division = division;

            $scope.selectedCells = selectedCells;

            $scope.setRowColumn = function (selectedCells) {

                for (row in $scope.selectedCells) {

                    $scope.row = row;

                    for (column in $scope.selectedCells[row]) {

                        $scope.column = column;

                    }
                }

            };

            $scope.sample = {};
            $scope.sampleGrid = sampleGrid;

            $scope.close = function () {

                $modalInstance.close();

            };

            $scope.form = {};

            $scope.onSampleSelect = function (sample) {

                $scope.form.selectedSample = sample;

            };

            $scope.sampleGrid.setSelectItemCallback($scope.onSampleSelect);

            $scope.submit = function () {

                // update sample with new division row and cell
                $scope.form.selectedSample.divisionId = $scope.division.id;
                $scope.form.selectedSample.division = $scope.division;
                $scope.form.selectedSample.divisionRow = $scope.row;
                $scope.form.selectedSample.divisionColumn = $scope.column;
                $cbResource.update('/storage/sample?id[EQ]=' + $scope.form.selectedSample.id, $scope.form.selectedSample);
                callBack();
                $modalInstance.close();

            }

            $scope.setRowColumn();

        }

    ])
;
