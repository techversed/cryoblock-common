angular.module('storage.catalog.catalogFormCtrl', [])

    .controller('catalogFormCtrl', ['$scope', '$uibModalInstance', 'catalog', '$cbResource', 'toastr', 'callback', '$cbForm',

        function ($scope, $modalInstance, catalog, $cbResource, toastr, callback, $cbForm) {

            $scope.catalog = catalog ? angular.copy(catalog) : {};

            $scope.catalogForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Catalog')
                .setObject($scope.catalog)
                .setUrl('/storage/catalog')
                .setObjectClass('AppBundle\\Entity\\Storage\\Catalog')
            ;

            $scope.close = function () {

                $scope.cbForm.close($scope.catalogForm, $scope);

            };

            $scope.save = function () {

                $scope.cbForm.save($scope.catalogForm, $scope);

            };

        }

    ])
;
