angular.module('user.userRowActionsCtrl', [])

    .controller('userRowActionsCtrl', ['$scope', 'userFormFactory',

        function ($scope, userFormFactory) {

            $scope.edit = function (user) {

                userFormFactory.openFormModal(user);

            };

            $scope.disable = function (user) {

                userFormFactory.openDisableModal(user);

            };
        }

    ])
;
