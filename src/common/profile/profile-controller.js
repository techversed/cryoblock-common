angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$localStorage', '$uibModal', 'user', 'API', 'profileFormFactory', 'grid', 'userBool',

        function ($scope, $localStorage, $modal, user, API, profileFormFactory, grid, userBool) {

            $scope.user = user;
            $scope.grid = grid;

            // $scope.bool =

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

            $scope.changePassword = function () {
                $modal.open({
                    templateUrl: 'common/profile/profile-change-password-tpl.html',
                    controller: 'changePasswordCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    resolve: {

                        user: function () {

                            return $scope.user;

                        }

                    }
                });
            }
        }

    ])
;
