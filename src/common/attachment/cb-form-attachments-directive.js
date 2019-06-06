angular.module('attachment.cbFormAttachmentsDirective', [])

    .directive('cbFormAttachments', ['$compile',

        function ($compile) {

            return {

                require: '^form',

                scope: {
                    parentObject: '=',
                    form: '='
                },

                restrict: 'E',

                templateUrl: 'common/attachment/partials/cb-form-attachments-tpl.html',

                controller: function ($scope) {

                    var fileForm;
                    var fileInput;

                    $scope.resetFileInput = function () {

                        if (fileForm) {
                            fileForm.remove();
                        }

                        fileForm = angular.element('<form id="cb-upload-form"><input id="cb-upload-input" multiple style="display:none" type="file"></input></form>');
                        $compile(fileForm)($scope);

                        $scope.form.setUploadElement(fileForm);

                        angular.element(document).find('body').append(fileForm);

                        fileInput = fileForm.find('input');

                        fileInput.on('change', function () {
                            var files = angular.element(fileInput)[0].files;
                            $scope.initializeFiles(files);
                        });

                    };

                    $scope.resetFileInput();

                    $scope.$on('$destroy', function () {

                        if (fileForm) {
                            fileForm.remove();
                        }

                    });

                    $scope.removeFile = function (file) {
                        $scope.form.removeFile(file);
                    };

                    $scope.upload = function () {
                        angular.element(fileInput).click();
                    }

                    $scope.initializeFiles = function (files) {

                        $scope.form.addFiles(files, $scope);
                        $scope.setUnpristine();

                    }

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.setUnpristine = function () {
                        formCtrl.$pristine = false;
                    };

                }

            }

        }

    ])
;
