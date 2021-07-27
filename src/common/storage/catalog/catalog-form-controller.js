angular.module('storage.catalog.catalogFormCtrl', [])
    .controller('catalogFormCtrl', ['$scope', 'catalog', 'toastr', 'targetGrid', 'donorGrid', 'patentGrid', 'callback', '$cbForm',

        function ($scope, catalog, toastr, targetGrid, donorGrid, patentGrid, callback, $cbForm) {

            $scope.catalog = catalog ? angular.copy(catalog) : {};
            $scope.targetGrid = targetGrid;
            $scope.donorGrid = donorGrid;
            $scope.patentGrid = patentGrid;

            $scope.catalogBoolOnToggle = function(){
                $scope.sample.catalog = undefined;
            }

            $scope.catalogForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Catalog')
                .setObject($scope.catalog)
                .setUrl('/storage/catalog')
                .setObjectClass('AppBundle\\Entity\\Storage\\Catalog')
            ;

            $scope.statuses = ['Available', 'Depleted', 'Destroyed'];

            $scope.close = function () {
                $scope.cbForm.close($scope.catalogForm, $scope);
            };

            $scope.save = function () {
                $scope.cbForm.save($scope.catalogForm, $scope);
            };
        }
    ])
;
