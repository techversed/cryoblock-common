angular.module('storage.storageDivisionDetailsCtrl', [])
    .controller('storageDivisionDetailsCtrl', ['$scope', 'division',

        function ($scope, division) {

            $scope.division = division;
            $scope.selected = false;

            $scope.$on('storage_box.details.well_selected', function (event, data) {

                $scope.selected = true;
                $scope.selectedWell = data;

                $scope.$apply();

            });

        }

    ])
;
