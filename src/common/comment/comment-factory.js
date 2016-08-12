angular.module('comment.commentFactory', [])

    .factory('commentFactory', ['$cbResource',

        function ($cbResource) {

            var commentFactory = {

                getCommentsByObject: function (objectType, objectId) {

                    var params = {
                        'objectType[EQ]': objectType,
                        'objectId[EQ]': objectId,
                        'parentId[NULL]': true
                    };

                    return $cbResource.get('/comment', params).then(function (response) {

                        return response.data;

                    });

                }

            };

            return commentFactory;

        }

    ])
;
