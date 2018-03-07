angular.module('profile.profileActivityDirective', [])
    .directive('profileActivity', ['sessionFactory', 'API', '$rootScope', '$cbResource',
        function (sessionFactory, API, $rootScope, $cbResource) {
            return {
                restrict: 'E',
                templateUrl: 'common/profile/profile-activity-tpl.html',
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
                    });


                }
            }
        }
    ])
;
