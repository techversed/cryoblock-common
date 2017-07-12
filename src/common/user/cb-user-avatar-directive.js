angular.module('user.cbUserAvatarDirective', [])
    .directive('cbUserAvatar', ['sessionFactory', 'API', '$rootScope',
        function (sessionFactory, API, $rootScope) {
            return {
                restrict: 'E',
                user: 'E',
                templateUrl: 'common/user/partials/cb-user-avatar-tpl.html',
                scope: {
                    user: '='
                },
                link: function ($scope) {

                    $scope.hasAvatar = function () {

                        return typeof $scope.user.avatarAttachment !== 'undefined';

                    }

                    $scope.setAvatarSrc = function () {

                        $scope.avatarSrc = $scope.hasAvatar()
                            ? API.url + '/attachment/' + $scope.user.avatarAttachment.id + '/download'
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
