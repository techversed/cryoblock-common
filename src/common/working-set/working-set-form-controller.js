angular.module('workingSet.workingSetFormCtrl', [])
    .controller('workingSetFormCtrl', ['$scope', '$uibModalInstance', '$cbResource', 'toastr', 'callback', '$cbForm', 'workingSetManager',
        function ($scope, $uibModalInstance, $cbResource, toastr, callback, $cbForm, workingSetManager) {

            $scope.wsm = workingSetManager;
            $scope.workingSetForm = {};

            $scope.cbForm = $cbForm.create();

            $scope.close = function (){
                $scope.cbForm.close($scope.workingSetForm, $scope, {'skipConfirm': true});
            };

        }
    ])
;
