angular.module('comment.cbCommentDirective', [])

    .directive('cbComment', ['commentFactory', '$compile', '$sce', 'toastr', '$cbResource', 'sessionFactory',

        function (commentFactory, $compile, $sce, toastr, $cbResource, sessionFactory) {

            return {

                scope: {comment: '='},

                restrict: 'E',

                templateUrl: 'common/comment/partials/cb-comment-tpl.html',

                link: function ($scope, element, attrs) {

                    $scope.loggedInUser = sessionFactory.getLoggedInUser();

                    if ($scope.comment && $scope.comment.children.length) {

                        $scope.childList = angular.element('<ul class="cb-comment-list"></ul>');

                        element.append($scope.childList);

                        angular.forEach($scope.comment.children, function (child, key) {

                            var linkFn = $compile('<li><cb-comment comment="comment.children[' + key + ']"></cb-comment></li>');

                            var template = linkFn($scope);

                            $scope.childList.append(template);

                        });

                    }

                    var textarea = element.find('textarea')[0];


                    var simplemde = new SimpleMDE({
                        autofocus: false,
                        initialValue: $scope.comment.content,
                        element: textarea,
                        tabSize: 4,
                        showIcons: ["code", "table"],
                        status: false,
                        renderingConfig: {
                            singleLineBreaks: false,
                            codeSyntaxHighlighting: true
                        },
                        spellChecker: false,
                        hintOptions: {

                            completeSingle: false,
                            hint: function (cm, test1, test2) {

                                completion = cm.state.completionActive;

                                var startPos = {
                                    line: completion.startPos.line,
                                    ch: completion.startPos.ch + 1
                                };

                                var cursor =  cm.getCursor();

                                var search = cm.getRange(startPos, cursor);

                                var params = {cSearch: search}

                                return $cbResource.get('/user', params).then(function (response) {

                                    var users = [];
                                    angular.forEach(response.data, function (user) {
                                        users.push({
                                            text: user.username,
                                            displayText: user.username + ' ( ' + user.fullName + ' )'
                                        });
                                    });
                                    // var cursor = cm.getCursor(), line = cm.getLine(cursor.line);

                                    return {
                                        list: users,
                                        from: startPos,
                                        to: cursor
                                    };

                                });
                            }

                        }

                    });

                    $scope.markdownHtml = $sce.trustAsHtml(simplemde.markdown(simplemde.value()));

                    $scope.edit = function () {

                        $scope.isEditing = true;

                    };

                    $scope.update = function () {

                        if ($scope.comment.parentId) {
                            $scope.comment.parent = {id: $scope.comment.parentId};
                        }

                        $scope.comment.content = simplemde.value();

                        commentFactory.updateComment($scope.comment).then(function () {
                            toastr.success('Comment updated successfully');
                            $scope.markdownHtml = $sce.trustAsHtml(simplemde.markdown(simplemde.value()));
                            $scope.isEditing = false;
                        });

                    };

                    $scope.create = function () {

                        if ($scope.comment.parentId) {
                            $scope.comment.parent = {id: $scope.comment.parentId};
                        }

                        $scope.comment.content = simplemde.value();
                        $scope.comment.htmlContent = simplemde.options.previewRender(simplemde.value());

                        commentFactory.createComment($scope.comment).then(function (response) {
                            toastr.success('Comment created successfully');
                            $scope.markdownHtml = $sce.trustAsHtml(simplemde.markdown(simplemde.value()));
                            $scope.isEditing = false;
                            $scope.comment = response.data;
                        });

                    }

                    $scope.cancel = function () {

                        if ($scope.comment.id === undefined) {
                            element.remove();
                        }

                        simplemde.value($scope.comment.content);

                        if (simplemde.isPreviewActive()) {
                            simplemde.togglePreview();
                        }

                        $scope.isEditing = false;


                    };

                    $scope.reply = function () {

                        if (!$scope.comment.children.length) {

                            $scope.childList = angular.element('<ul class="cb-comment-list"></ul>');

                            element.append($scope.childList);

                        }

                        $scope.comment.children.push({
                            children: [],
                            parentId: $scope.comment.id,
                            content: null,
                            objectType: $scope.comment.objectType,
                            objectId: $scope.comment.objectId,
                            level: $scope.comment.level + 1
                        });

                        var linkFn = $compile('<li><cb-comment comment="comment.children[' + ($scope.comment.children.length - 1) + ']" cb-comment-edit-on-load ></cb-comment></li>');

                        var template = linkFn($scope);

                        $scope.childList.append(template);

                    };

                    if (attrs.cbCommentEditOnLoad !== undefined) {
                        $scope.isEditing = true;
                    }

                    simplemde.codemirror.on("keydown", function(cm, e){

                        if (e.keyCode === 50) {

                            cm.execCommand("autocomplete");


                        }

                    });

                }

            };

        }

    ])
;
