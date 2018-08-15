angular.module('storage.catalog.catalogFormCtrl', [])

    .controller('catalogFormCtrl', ['$scope', 'catalog', '$cbResource', '$cbForm',

        function ($scope, catalog, $cbResource,  $cbForm) {

            $scope.catalog = catalog ? angular.copy(catalog) : {};
            $scope.catalogForm = {};

            $scope.catalogBoolOnToggle = function(){
                $scope.sample.catalog = undefined;
            }

            $scope.cbForm = $cbForm.create()
                .setType('Catalog')
                .setObject($scope.catalog)
                .setUrl('/storage/catalog')
                .setObjectClass('AppBundle\\Entity\\Storage\\Catalog')
            ;

            $scope.close = function () {
                $scope.cbForm.close($scope.sampleForm, $scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.sampleForm, $scope);

            };

        }

    ])
;
