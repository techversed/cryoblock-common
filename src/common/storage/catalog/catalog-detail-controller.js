angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'dnaSamples', 'proteinSamples', 'seraSamples', 'bacterialSamples', 'mammalianSamples', 'yeastSamples', 'chemicalSamples', 'solutionSamples', 'otherSamples',

        function ($scope, catalog, dnaSamples, proteinSamples, seraSamples, bacterialSamples, mammalianSamples, yeastSamples, chemicalSamples, solutionSamples, otherSamples) {

            $scope.catalog = catalog;

            $scope.dnaSamples = dnaSamples;
            $scope.proteinSamples = proteinSamples;
            $scope.seraSamples = seraSamples;
            $scope.bacterialSamples = bacterialSamples;
            $scope.mammalianSamples = mammalianSamples;
            $scope.yeastSamples = yeastSamples;
            $scope.chemicalSamples = chemicalSamples;
            $scope.solutionSamples = solutionSamples;
            $scope.otherSamples = otherSamples;
        }

    ])
;
