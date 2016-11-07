angular.module('admin.adminUserCtrl', [])

    .controller('adminUserCtrl', ['$scope', 'userGrid', 'userFormFactory', '$state',

        function ($scope, userGrid, userFormFactory, $state) {

            $scope.userGrid = userGrid;
            $scope.active = 0;

            $scope.createUser = function () {
                userFormFactory.openFormModal();
            };

            $scope.navigateToGroups = function () {
                $state.go('admin.group');
            };

            $scope.navigateToRoles = function () {
                $state.go('admin.role');
            };

            // $scope.deactivateUser = function (user) {

            //     if (sessionFactory.getLoggedInUser().id === user.id) {

            //         swal('Error', 'You can not deactivate yourself.', "error");

            //         return;

            //     }

            //     swal({

            //         title: "Are you sure?",
            //         text: "User " + user.fullName + " will be deactivated",
            //         type: "warning",
            //         showCancelButton: true,
            //         confirmButtonColor: "#DD6B55",
            //         confirmButtonText: "Yes, deactivate!",
            //         closeOnConfirm: false,
            //         html: false

            //     }, function() {

            //         adminFactory.deactivateUser(user.id).then(

            //             function (response) {

            //                 $scope.userTableInstance.reloadData();

            //                 swal("Deleted!", "Your imaginary file has been deleted.", "success");

            //             },

            //             function (response) {

            //                 swal('Error', 'An error occured while attempting deactivation. Please try again.', "error");

            //             }
            //         );

            //     });

            // };

        }

    ])
;
