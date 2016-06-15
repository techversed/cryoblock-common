angular.module('profile.photoUploadCtrl', ['ngImgCrop', 'angular-svg-round-progress'])
    .controller('photoUploadCtrl', ['$scope', '$modalInstance', 'API', '$localStorage', 'toastr', 'sessionFactory',

        function ($scope, $modalInstance, API, $localStorage, toastr, sessionFactory) {

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
                    url: API.url + '/_uploader/profile/upload',
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
                sessionFactory.refreshUser();
                $scope.close();
                toastr.info('Profile photo uploaded successfully');
            }

            $scope.close = function () {
                $modalInstance.close();
            }

        }

    ])
;
