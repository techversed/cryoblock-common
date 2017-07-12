angular.module('user.userRowActionsCtrl', [])

    .controller('userRowActionsCtrl', ['$scope', 'userFormFactory', 'sessionFactory',

        function ($scope, userFormFactory, sessionFactory) {

            $scope.canDisable = true;
            if ($scope.result.id === sessionFactory.getLoggedInUser().id) {
                $scope.canDisable = false;

            }
            if (!$scope.result.enabled) {
                $scope.canDisable = false;
            }

            $scope.edit = function (user) {

                userFormFactory.openFormModal(user);

            };

            $scope.disable = function (user) {

                userFormFactory.openDisableModal(user);

            };
        }

    ])
;
