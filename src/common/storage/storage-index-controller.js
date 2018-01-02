angular.module('storage.storageIndexCtrl', [])
    .controller('storageIndexCtrl', ['$scope', 'divisionResponse', 'storageFormFactory',

        function ($scope, divisionResponse, storageFormFactory) {

            $scope.divisions = divisionResponse.data;

            $scope.create = storageFormFactory.openDivisionFormModal;

        }

    ])
;
