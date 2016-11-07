angular.module('admin.adminGroupCtrl', [])

    .controller('adminGroupCtrl', ['$scope', 'groupGrid', 'groupFormFactory', '$state',

        function ($scope, groupGrid, groupFormFactory, $state) {

            $scope.groupGrid = groupGrid;
            $scope.active = 1;

            $scope.createGroup = function () {
                groupFormFactory.openFormModal();
            };

            $scope.navigateToUsers = function ($event) {
                $state.go('admin.user');
            };

            $scope.navigateToRoles = function () {
                $state.go('admin.role');
            };

        }

    ])
;
