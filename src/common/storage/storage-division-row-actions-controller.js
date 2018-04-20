angular.module('storage.storageDivisionRowActionsCtrl', [])

    .controller('storageDivisionRowActionsCtrl', ['$scope', 'storageFormFactory', 'sessionFactory',

        function ($scope, storageFormFactory, sessionFactory) {

            $scope.edit = function (division) {

                if (division.canEdit === false) {

                    swal({
                        title: "Sorry,",
                        text: "You do not have permission to edit this division.",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    }, function() {});

                    return;
                }

                storageFormFactory.openDivisionFormModal(division);

            };

            $scope.disable = function (division) {

                storageFormFactory.openDisableModal(division);

            };
        }

    ])
;
