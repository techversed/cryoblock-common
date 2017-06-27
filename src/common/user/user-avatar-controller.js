angular.module('user.userAvatarCtrl', [])
    .controller('userAvatarCtrl', ['$scope', '$localStorage', '$uibModal',  'API',

        function ($scope, $localStorage, $modal,  API) {

            // $scope.user = user;

            $scope.hasAvatar = function () {
                return typeof $scope.user.avatar_attachment !== 'undefined';
            }

            $scope.avatarSrc = $scope.hasAvatar()
                ? API.url + '/attachment/' + $scope.user.avatar_attachment.id + '/download'
                : null
            ;

            $scope.uploadPhoto = function () {
                $modal.open({
                    templateUrl: 'common/profile/profile-photo-upload-tpl.html',
                    controller: 'photoUploadCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static'
                });
            }
        }

    ])
;
