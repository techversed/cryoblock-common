angular.module('comment.cbCommentDirective', [])

    .directive('cbComment', ['commentFactory', '$compile',

        function (commentFactory, $compile) {

            return {

                scope: {comment: '='},

                restrict: 'E',

                templateUrl: 'common/comment/partials/cb-comment-tpl.html',

                link: function ($scope, element, attrs) {

                    if ($scope.comment && $scope.comment.children.length) {

                        var childList = angular.element('<ul class="cb-comment-list"></ul>');

                        element.append(childList);

                        angular.forEach($scope.comment.children, function (child, key) {

                            var linkFn = $compile('<li><cb-comment comment="comment.children[' + key + ']"></cb-comment></li>');

                            var template = linkFn($scope);

                            childList.append(template);

                        });

                    }

                }

            };

        }

    ])
;
