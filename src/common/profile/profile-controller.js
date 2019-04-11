angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$uibModal', 'user', 'API', 'profileFormFactory', 'grid', 'userBool', '$cbResource', 'watchedRequestsGrid',

        function ($scope, $modal, user, API, profileFormFactory, grid, userBool, $cbResource, watchedRequestsGrid) {

            $scope.user = user;
            $scope.grid = grid;
            $scope.watchedRequestsGrid = watchedRequestsGrid;

            $scope.userBool = userBool; // User Bool true of the user is going to their own profile page -- false if not--

            // $scope.bool =

            $scope.edit = profileFormFactory.openFormModal;

            console.log(watchedRequestsGrid)
            console.log(1)


            $cbResource.get('/project/project-editor/user/' + $scope.user.id).then(function (response) {
                $scope.projects = response.data;
            });

            $scope.hasAvatar = function () {
                return typeof $scope.user.avatarAttachment !== 'undefined';
            }

            $scope.avatarSrc = $scope.hasAvatar()
                ? API.url + '/attachment/' + $scope.user.avatarAttachment.id + '/download'
                : null
            ;

            // Don't allow for people to pop the upload photo modal on someone else's profile page
            $scope.uploadPhoto = function () {
                console.log('upload photo function');
                if (userBool) {
                    $modal.open({
                        templateUrl: 'common/profile/partials/profile-photo-upload-tpl.html',
                        controller: 'photoUploadCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static'
                    });
                }
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
