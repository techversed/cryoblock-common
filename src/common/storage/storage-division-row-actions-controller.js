angular.module('storage.storageDivisionRowActionsCtrl', [])

    .controller('storageDivisionRowActionsCtrl', ['$scope', 'storageFormFactory', 'sessionFactory',

        function ($scope, storageFormFactory, sessionFactory) {

            $scope.edit = function (division) {

                storageFormFactory.openFormModal(division);

            };

            $scope.disable = function (division) {

                storageFormFactory.openDisableModal(division);

            };
        }

    ])
;
