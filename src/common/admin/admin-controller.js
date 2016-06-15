angular.module('admin.adminCtrl', [])
    .controller('adminCtrl', ['$scope', 'userRequest', 'roleRequest', 'groupRequest', '$modal', 'adminFactory', 'sessionFactory', 'API',

        function ($scope, userRequest, roleRequest, groupRequest, $modal, adminFactory, sessionFactory, API) {

            $scope.userResponse = userRequest;
            $scope.roleResponse = roleRequest;
            $scope.groupResponse = groupRequest;
            $scope.userTableInstance = {};

            $scope.users = userRequest.data;

            $scope.deactivateUser = function (user) {

                if (sessionFactory.getLoggedInUser().id === user.id) {

                    swal('Error', 'You can not deactivate yourself.', "error");

                    return;

                }

                swal({

                    title: "Are you sure?",
                    text: "User " + user.fullName + " will be deactivated",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, deactivate!",
                    closeOnConfirm: false,
                    html: false

                }, function() {

                    adminFactory.deactivateUser(user.id).then(

                        function (response) {

                            $scope.userTableInstance.reloadData();

                            swal("Deleted!", "Your imaginary file has been deleted.", "success");

                        },

                        function (response) {

                            swal('Error', 'An error occured while attempting deactivation. Please try again.', "error");

                        }
                    );

                });

            };

        }

    ])
;
