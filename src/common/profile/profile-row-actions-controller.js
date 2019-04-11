angular.module('profile.profileRowActionsCtrl', [])

    .controller('profileRowActionsCtrl', ['$scope', 'proteinPurificationFormFactory', '$cbResource', '$state', '$stateParams',

        function ($scope, proteinPurificationFormFactory, $cbResource, $state, $stateParams) {

            $scope.edit = proteinPurificationFormFactory.openFormModal;
            $scope.delete = proteinPurificationFormFactory.openDeleteForm;
            $scope.restore = proteinPurificationFormFactory.openRestoreForm;
            $scope.purge = proteinPurificationFormFactory.openPurgeForm;

        }
    ])
;
