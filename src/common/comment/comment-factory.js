angular.module('comment.commentFactory', [])

    .factory('commentFactory', ['$cbResource',

        function ($cbResource) {

            var commentFactory = {

                getCommentsByObject: function (objectType, objectId) {

                    var params = {
                        'cOrderBy': 'id',
                        'cOrderByDirection': 'ASC',
                        'objectType[EQ]': objectType,
                        'objectId[EQ]': objectId,
                        'parentId[NULL]': true
                    };

                    return $cbResource.get('/comment', params).then(function (response) {

                        return response.data;

                    });

                },

                createComment: function (comment) {

                    return $cbResource.create('/comment', comment);

                },

                updateComment: function (comment) {

                    var params = {'id[EQ]': comment.id};

                    return $cbResource.update('/comment', comment, params);

                }

            };

            return commentFactory;

        }

    ])
;
