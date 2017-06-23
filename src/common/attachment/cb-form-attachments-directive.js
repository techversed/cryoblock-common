angular.module('attachment.cbFormAttachmentsDirective', [])

    .directive('cbFormAttachments', ['$localStorage', '$compile', 'API',

        function ($localStorage, $compile, API) {

            return {

                require: '^form',

                scope: {
                    parentObject: '='
                },

                restrict: 'E',

                templateUrl: 'common/attachment/partials/cb-form-attachments-tpl.html',

                controller: function ($scope) {

                    $scope.files = [];

                    var fileForm;
                    var fileInput;

                    $scope.resetFileInput = function () {

                        if (fileForm) {
                            fileForm.remove();
                        }

                        fileForm = angular.element('<form id="cb-upload-form" file-upload><input id="cb-upload-input" multiple style="display:none" type="file"></input></form>');
                        $compile(fileForm)($scope);

                        angular.element(document).find('body').append(fileForm);

                        fileInput = fileForm.find('input');
                        console.log(fileInput);

                        fileInput.on('change', function () {
                            var files = angular.element(fileInput)[0].files;
                            console.log(files);
                            $scope.initializeFiles(files);
                        });

                    };

                    $scope.resetFileInput();

                    $scope.$on('$destroy', function () {
                        if (fileForm) {
                            fileForm.remove();
                        }
                    });

                    $scope.upload = function () {
                        angular.element(fileInput).click();
                    }

                    $scope.initializeFiles = function (files) {

                        for (var i = 0; i < files.length; i++) {

                            var file = files[i], reader = new FileReader()

                            reader.onload = (function(file) {
                                return function(e) {
                                    console.log(e);
                                    file.src = e.target.result
                                    $scope.$apply();
                                };
                            })(file)

                            // Read in the image file as a data URL.
                            reader.readAsDataURL(file)

                            $scope.files.push(file)
                            $scope.$apply();

                        }

                        return files;

                    }

                    $scope.isImage = function (file) {
                        switch (file.type) {
                            case "image/jpeg":
                                return true;
                            case "image/png":
                                return true;
                            default:
                                return false;
                        }
                    }



                },

                link: function ($scope, element, attrs, ctrls) {

                    $scope.$on('form:saved', function () {

                        // console.log('Im saved');
                        // console.log(ctrls);

                        // $scope.showProgress = true;

                        angular.forEach($scope.files, function (file) {

                            console.log(file);
                            var blob = window.dataURLtoBlob(file.src);
                            console.log(blob);

                            blob.name = file.name;

                            var options = {
                                files: [blob],
                                url: API.url + '/_uploader/cryoblock/upload?object_id=' + $localStorage.User.id + '&object_class=Carbon\\ApiBundle\\Entity\\Sample',
                                headers: {}
                            };

                            options.headers[API.apiKeyParam] = $localStorage.User.apiKey;

                            // console.log(angular.element('#cb-upload-input'));

                            angular.element('#cb-upload-form')
                                .fileupload('send', options)
                                .complete(function () {
                                    console.log(123);
                                    // $scope.onUploadSuccess();
                                })
                            ;

                        })

                    });


                }

            }

        }

    ])
;
