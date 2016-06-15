angular.module('profile.profileAvatarDirective', [])
    .directive('profileAvatar', ['sessionFactory', 'API',
        function (sessionFactory, API) {
            return {
                restrict: 'E',
                templateUrl: 'common/profile/profile-avatar-tpl.html',
                link: function ($scope) {

                    $scope.getUser = function () {

                        return sessionFactory.getLoggedInUser();

                    }

                    $scope.hasAvatar = function () {

                        return typeof $scope.getUser().avatarAttachment !== 'undefined';

                    }

                    var setAvatarSrc = function () {

                        $scope.avatarSrc = $scope.hasAvatar()
                            ? API.url + '/attachment/' + $scope.getUser().avatarAttachment.id + '/download'
                            : null
                        ;

                    }

                    $scope.$watch(

                        function () {

                            return sessionFactory.getLoggedInUser().avatarAttachment.id

                        },

                        function (v) {

                            setAvatarSrc();

                        }

                    );
                }
            }
        }
    ])
;
