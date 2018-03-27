angular.module('print.printSampleImportCtrl', [])

    .controller('printSampleImportCtrl', ['$scope', 'printSampleImport',

        function ($scope, printSampleImport) {

            $scope.samples = printSampleImport.samples
            console.log($scope.samples)

        }

    ])
;
