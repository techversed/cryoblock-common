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
                        $scope.addDefault();
                        $scope.isLoading = false;
                    });

                    $scope.addDefault = function () {

                        $scope.comments.push({
                            children: [],
                            content: null,
                            objectType: $scope.objectType,
                            objectId: $scope.objectId,
                            level: 0,
                            isDefault: true
                        });

                    }

                    $scope.$on('comment.replace_default', $scope.addDefault);

                }

            };

        }

    ])
;
