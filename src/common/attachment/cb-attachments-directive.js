angular.module('attachment.cbAttachmentsDirective', [])

    .directive('cbAttachments', ['$cbResource', 'API',

        function ($cbResource, API) {

            return {

                scope: {
                    objectClass: '@',
                    objectId: '='
                },

                restrict: 'E',

                templateUrl: 'common/attachment/partials/cb-attachments-tpl.html',

                controller: function ($scope) {

                    $scope.isImage = function (attachment) {

                        switch (attachment.mimeType) {
                            case "image/jpeg":
                                return true;
                            case "image/png":
                                return true;
                            default:
                                return false;
                        }

                    };

                    $scope.deleteAttachment = function (attachment) {

                        swal({
                            title: "Are you sure?",
                            text: "This attachment will deleted.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true

                        }, function() {

                            $scope.isLoading = true;
                            $cbResource.delete('/attachment',{'id[EQ]': attachment.id}).then(function () {
                                $scope.refresh();
                            });

                        });

                    };

                    $scope.refresh = function () {

                        $scope.isLoading = true;
                        $cbResource.get('/attachment', {
                            'objectClass[EQ]': $scope.objectClass,
                            'objectId[EQ]': $scope.objectId
                        }).then(function (response) {
                            $scope.attachments = response.data;
                            $scope.isLoading = false;
                            angular.forEach($scope.attachments, function (attachment) {
                                attachment.src = API.url + '/attachment/' + attachment.id + '/download';
                                attachment.isImage = $scope.isImage(attachment);
                            });
                        });

                    };

                    $scope.refresh();

                },

                link: function ($scope, element, attrs) {

                }

            }

        }

    ])
;
