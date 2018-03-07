angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$localStorage', '$uibModal', 'user', 'API', 'profileFormFactory',

        function ($scope, $localStorage, $modal, user, API, profileFormFactory) {

            $scope.user = user;

            $scope.edit = profileFormFactory.openFormModal;
            $scope.hasAvatar = function () {
                return typeof $scope.user.avatar_attachment !== 'undefined';
            }

            $scope.avatarSrc = $scope.hasAvatar()
                ? API.url + '/attachment/' + $scope.user.avatar_attachment.id + '/download'
                : null
            ;

            $scope.uploadPhoto = function () {
                $modal.open({
                    templateUrl: 'common/profile/partials/profile-photo-upload-tpl.html',
                    controller: 'photoUploadCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static'
                });
            }
        }

    ])
;
