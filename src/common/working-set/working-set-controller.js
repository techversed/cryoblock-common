
angular.module('workingSet.workingSetCtrl', [])

    .controller('workingSetCtrl', ['$scope', '$uibModalInstance', 'workingSet', '$cbResource', 'toastr', 'callback', '$cbForm', 'workingSetManager',

        function ($scope, $modalInstance, workingSet, $cbResource, toastr, callback, $cbForm, workingSetManager) {

            $scope.workingSet = workingSet ? angular.copy(workingSet) : {};
            $scope.wsm = workingSetManager;
            $scope.workingSetForm = {};

            $scope.cbForm = $cbForm.create()
            ;

            $scope.close = function (){

                $scope.cbForm.close($scope.workingSetForm,$scope);
            };


        }

    ])
;
