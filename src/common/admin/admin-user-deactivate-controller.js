angular.module('admin.userCreateCtrl', [])
    .controller('adminUserDeactivateCtrl', ['$scope', 'adminFactory', 'user',

        function ($scope, adminFactory, user) {

            $scope.user = user;

            $scope.deactivate = function (user) {

                // adminFactory.deactivateUser(user.id).then(

                //     function (response) {

                //         toastr.info('User successfully deactivated');

                //         $state.go('admin.index');

                //     },

                //     function (response) {

                //         toastr.error('An error occured while attempting to deactivate user. Please try again.');

                //     }
                // );

            }
        }

    ])
;
