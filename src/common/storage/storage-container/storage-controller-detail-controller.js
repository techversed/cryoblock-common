
angular.module('storageContainer.storageContainerDetailCtrl', [])

    .controller('storageContainerDetailCtrl', ['$scope', 'storageContainer', 'storageContainerFormFactory', '$window',

        function ($scope, storageContainer, storageContainerFormFactory, $window) {

            $window.scroll(0,0);

            $scope.storageContainer = storageContainer;

            $scope.edit = storageContainerFormFactory.openFormModal;
            $scope.delete = storageContainerFormFactory.openDeleteForm

        }

    ])
;
