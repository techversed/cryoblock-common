angular.module('profile.profileActivityDirective', [])
    .directive('profileActivity', ['sessionFactory', 'API', '$rootScope', '$cbResource',
        function (sessionFactory, API, $rootScope, $cbResource) {
            return {
                restrict: 'E',
                templateUrl: 'common/profile/partials/profile-activity-tpl.html',
                link: function ($scope) {

                    $scope.getActivityUser = function () {

                        $scope.userActivity = sessionFactory.getLoggedInUser();

                    }

                    $scope.getActivityUser();

                    var params = {
                        'username[EQ]': $scope.userActivity.username,
                        'cOrderByDirection': 'DESC',
                        'cPerPage': 25
                    };

                    $cbResource.get('/log-entry', params).then(function (response) {
                        $scope.logs = response.data;
                        //slice out namespace from object
                        angular.forEach($scope.logs, function (log) {
                            //this will always work
                            if (log.objectClass === "Carbon\\ApiBundle\\Entity\\User") {
                                log.objectClass = log.objectClass.slice(24, 28);
                                $scope.object = "admin.user_detail"
                            } else {
                                //this will not always work can we make it slice at the 3rd "\"
                                log.objectClass = log.objectClass.slice(17);
                            }
                        })
                    });


                }
            }
        }
    ])
;
