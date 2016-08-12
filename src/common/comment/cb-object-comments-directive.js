angular.module('comment.cbObjectCommentsDirective', [])

    .directive('cbObjectComments', ['commentFactory',

        function (commentFactory) {

            return {

                scope: {
                    objectType: '@',
                    objectId: '='
                },

                restrict: 'E',

                templateUrl: 'common/comment/partials/cb-object-comments-tpl.html',

                controller: function ($scope) {

                    if ($scope.objectType === undefined || $scope.objectId === undefined) {

                        throw Error('cbObjectComments directive requires object-type and object-id attributes');

                    }

                    $scope.comments = [];
                    $scope.isLoading = true;
                    commentFactory.getCommentsByObject($scope.objectType, $scope.objectId).then(function (response) {
                        $scope.comments = response;
                        $scope.isLoading = false;
                    });

                }

            };

        }

    ])
;
