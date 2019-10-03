    angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$uibModal', 'user', 'API', 'profileFormFactory', 'userBool', '$cbResource', 'watchedRequestsGrid', '$state', '$stateParams',

        function ($scope, $modal, user, API, profileFormFactory, userBool, $cbResource, watchedRequestsGrid, $state, $stateParams) {

            $scope.dismissAll = function () {

                $cbResource.create('/cryoblock/user-object-notification/dismiss-watche-requests',{}).then(function(){
                    $state.go($state.current, $stateParams, {reload:true});
                });
                // $route.reload();

            }

            $scope.user = user;
            $scope.watchedRequestsGrid = watchedRequestsGrid;

            $scope.userBool = userBool; // User Bool true of the user is going to their own profile page -- false if not--


            $scope.edit = profileFormFactory.openFormModal;

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
