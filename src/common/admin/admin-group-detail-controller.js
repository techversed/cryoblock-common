angular.module('admin.adminGroupDetailCtrl', [])

    .controller('adminGroupDetailCtrl', ['$scope', 'group', 'groupFormFactory',

        function ($scope, group, groupFormFactory) {

            $scope.group = group;
            // $scope.linkedRolesGrid = linkedRolesGrid;
            $scope.edit = groupFormFactory.openGroupFormModal;

            $scope.groupTypeIconMapping = {

            };

            // $scope.iconFile = $scope.groupTypeIconMapping[$scope.group.groupType.name];

        }

    ])
;
