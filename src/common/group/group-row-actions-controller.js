angular.module('group.groupRowActionsCtrl', [])

    .controller('groupRowActionsCtrl', ['$scope', 'groupFormFactory',

        function ($scope, groupFormFactory) {

            $scope.edit = function (user) {

                groupFormFactory.openFormModal(user);

            };

        }

    ])
;
