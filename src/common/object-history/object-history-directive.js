angular.module('objectHistory.objectHistoryDirective', [])

    .directive('objectHistory', ['$cbResource',

        function ($cbResource) {

            return {

                restrict: 'E',
                scope: {
                    objectClass: '@',
                    objectId: '='
                },
                templateUrl: 'common/object-history/partials/object-history-directive-tpl.html',
                controller: function ($scope) {

                    if ($scope.objectClass === undefined) {
                        throw new Error('Object class must be defined for object history directive');
                    }

                    if ($scope.objectId === undefined) {
                        throw new Error('Object id must be defined for object history directive');
                    }

                    var params = {
                        'objectClass[EQ]': $scope.objectClass,
                        'objectId[EQ]': $scope.objectId,
                        'cOrderBy': 'loggedAt',
                        'cOrderByDirection': 'ASC'
                    };

                    $cbResource.get('/log-entry', params).then(function (response) {
                        $scope.logEntries = response.data;
                    });

                }
            };

        }

    ])
;
