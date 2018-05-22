angular.module('notification.cbObjectWatchDirective', [])

    .directive('cbObjectWatch', ['$cbResource', 'sessionFactory', 'toastr', '$state', '$stateParams',

        function ($cbResource, sessionFactory, toastr, $state, $stateParams) {

            return {

                restrict: 'A',

                scope: {
                    entity: '@',
                    entityId: '=',
                    objectDescription: '@',
                    url: '@'
                },

                templateUrl: 'common/notification/partials/cb-object-watch-tpl.html',

                controller: function ($scope) {
                    $scope.loggedInUser = sessionFactory.getLoggedInUser();
                    $scope.userObjectNotification = null;

                    var data = {
                        'objectClassName[EQ]': $scope.entity
                    };

                    $cbResource.getOne('/cryoblock/entity-detail', data).then(function(response){
                        $scope.entityDetail = response;

                        var data = {
                            'entityDetailId[EQ]': $scope.entityDetail.id,
                            'entityId[EQ]': $scope.entityId,
                            'userId[EQ]': $scope.loggedInUser.id
                        };

                        $cbResource.getOne('/cryoblock/user-object-notification', data).then(function (response) {
                            $scope.userObjectNotification = response;
                        });

                    });

                },

                link: function ($scope, element, attrs) {

                    $scope.openWatchConfirm = function () {

                        swal({
                            title: "Are you sure?",
                            text: "By watching this object you will receive email notifications whenever it's updated.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true
                        }, function() {

                            var data = {
                                entityDetail: $scope.entityDetail,
                                entityId: $scope.entityId,
                                user: $scope.loggedInUser,
                                onCreate: true,
                                onUpdate: true,
                                onDelete: true
                            };
                            $cbResource.create('/cryoblock/user-object-notification', data).then(function (response) {
                                $state.go($state.current, $stateParams, {reload:true});
                                toastr.success('You are now watching ' + $scope.objectDescription + ' ' + $scope.entityId);
                            });

                        });

                    };

                    $scope.openStopWatchConfirm = function () {

                        swal({
                            title: "Are you sure?",
                            text: "By clicking Yes you will stop watching this object and will no longer receive email notifications whenever it's updated.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true
                        }, function() {

                            var data = {
                                'entityDetailId[EQ]': $scope.entityDetail.id,
                                'entityId[EQ]': $scope.entityId,
                                'userId[EQ]': $scope.loggedInUser.id
                            };

                            $cbResource.delete('/cryoblock/user-object-notification', data).then(function (response) {
                                $state.go($state.current, $stateParams, {reload:true});
                                toastr.success('You are no longer watching ' + $scope.objectDescription + ' ' + $scope.entityId);
                            });

                        });

                    };

                }

            };

        }

    ])
;
