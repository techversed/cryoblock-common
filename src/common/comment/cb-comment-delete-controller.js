angular.module('comment.cbCommentDeleteCtrl', [])

    .controller('cbCommentDeleteCtrl', ['$scope', 'comment', 'commentFactory',

        function ($scope, comment, commentFactory) {

            $scope.comment = comment

            $scope.delete = function () {
                commentFactory.deleteComment($scope.comment);
            };

        }

    ])
;
