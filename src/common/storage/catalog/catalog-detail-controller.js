angular.module('storage.catalog.catalogDetailCtrl', [])

    .controller('catalogDetailCtrl', ['$scope', 'catalog', 'samples', 'dnaSamples', 'proteinSamples',

        function ($scope, catalog, samples, dnaSamples, proteinSamples) {

            $scope.catalog = catalog;

            $scope.samples = samples.data;
            $scope.dnaSamples = dnaSamples;
            $scope.proteinSamples = proteinSamples;

            // $scope.sampleMap = {};

            // angular.forEach($scope.samples, function (sample) {
            // 	if ($scope.sampleMap[sample.sampleType.name] === undefined) {
            // 		$scope.sampleMap[sample.sampleType.name] = [];
            // 	}
            // 	$scope.sampleMap[sample.sampleType.name].push(sample);
            // });
            // console.log($scope.sampleMap);

        }

    ])
;
