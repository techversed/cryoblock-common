angular.module('profile.photoUploadCtrl', ['ngImgCrop', 'angular-svg-round-progress'])

    .controller('photoUploadCtrl', ['$scope', '$uibModalInstance', 'API', '$localStorage', 'toastr', 'sessionFactory', '$rootScope',

        function ($scope, $modalInstance, API, $localStorage, toastr, sessionFactory, $rootScope) {

            $scope.progress = 0;
            $scope.myImage='';
            $scope.myCroppedImage='';
            $scope.showProgress = false;
            $scope.fileSelected = false;

            $scope.$on('fileuploadprogress', function (e, data) {

                $scope.progress = data.loaded / data.total * 100;

            });

            $scope.$on('fileuploadchange', function (evt, data) {

                $scope.originalFileName = data.files[0].name;

                var file= data.files[0];
                var reader = new FileReader();

                reader.onload = function (evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };

                reader.readAsDataURL(file);

                $scope.fileSelected = true;

            });

            $scope.upload = function () {

                $scope.showProgress = true;

                var blob = window.dataURLtoBlob($scope.myCroppedImage);

                blob.name = $scope.originalFileName;

                var options = {
                    files: [blob],
                    url: API.url + '/_uploader/profile/upload?object_id=' + $localStorage.User.id + '&object_class=Carbon\\ApiBundle\\Entity\\User',
                    headers: {}
                };

                options.headers[API.apiKeyParam] = $localStorage.User.apiKey;

                angular.element('#profile-picture-upload-form')
                    .fileupload('send', options)
                    .complete(function () {
                        $scope.onUploadSuccess();
                    })
                ;

            };

            $scope.onUploadSuccess = function () {

                sessionFactory.refreshUser().then(function () {

                    $rootScope.$emit('profile.avatar_upload');
                    $scope.close();
                    toastr.info('Profile photo uploaded successfully');

                });

            }

            $scope.close = function () {
                $modalInstance.close();
            }

        }

    ])
;
