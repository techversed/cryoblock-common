angular.module('profile.profileAvatarDirective', [])
    .directive('profileAvatar', ['sessionFactory', 'API', '$rootScope',
        function (sessionFactory, API, $rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'common/profile/partials/profile-avatar-tpl.html',
                link: function ($scope) {

                    $scope.getUser = function () {

                        return sessionFactory.getLoggedInUser();

                    }

                    $scope.hasAvatar = function () {

                        return typeof $scope.getUser().avatarAttachment !== 'undefined';

                    }

                    $scope.setAvatarSrc = function () {

                        $scope.avatarSrc = $scope.hasAvatar()
                            ? API.url + '/attachment/' + $scope.getUser().avatarAttachment.id + '/download'
                            : null
                        ;

                    }

                    $scope.setAvatarSrc();

                    $rootScope.$on('profile.avatar_upload', $scope.setAvatarSrc);

                }
            }
        }
    ])
;
