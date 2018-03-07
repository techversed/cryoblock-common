angular.module('profile.profileFormCtrl', [])

    .controller('profileFormCtrl', ['$scope', '$uibModalInstance', 'user', '$cbResource', 'toastr', 'callback', '$cbForm',

        function ($scope, $modalInstance, user, $cbResource, toastr, callback, $cbForm) {

            $scope.user = user ? angular.copy(user) : {};
            $scope.userForm = {};


            $scope.cbForm = $cbForm.create()
                .setType('User')
                .setObject($scope.user)
                .setUrl('/user')
                .setObjectClass('Carbon\\\\ApiBundle\\\\Entity\\\\User')
            ;

            $scope.close = function () {

                $scope.cbForm.close($scope.userForm, $scope);

            };

            $scope.save = function () {

                $scope.cbForm.save($scope.userForm, $scope);

            };

        }

    ])
;
