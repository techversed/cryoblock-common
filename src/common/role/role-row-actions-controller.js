angular.module('role.roleRowActionsCtrl', [])

    .controller('roleRowActionsCtrl', ['$scope', 'roleFormFactory',

        function ($scope, roleFormFactory) {

            $scope.edit = function (user) {

                roleFormFactory.openFormModal(user);

            };

        }

    ])
;
