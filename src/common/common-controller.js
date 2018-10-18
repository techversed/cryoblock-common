angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', '$cbResource', '$cbGridBuilder',

        function ($scope, sessionFactory, navigationInitializer, $cbResource, $cbGridBuilder) {

            $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                $scope.workingSet = response['data'];
            });

            this.refreshWorkingSet1 = function(){
                $scope.loading = true;
                $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                    $scope.workingSet = response['data'];
                    $scope.loading = false;
                });
            };

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            if (sessionFactory.isLoggedInUser()) {

                this.user = sessionFactory.getLoggedInUser();

            }

            this.hasRole = sessionFactory.hasRole;

        }

    ])
;
