angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', '$cbResource',

        function ($scope, sessionFactory, navigationInitializer, $cbResource) {
            $scope.workingSet = {'id': 1111, 'catalog':{'stringLabel': 'asdlkjsdflkjsdflsdfjlsdkfjlsldkslkjfldkjsflksdjflksdjflkdjsflkjfjsldkfjlsdkfjlsdkjflskdjflskdjflskdjflksdjflksdjflskdjfldksjflksdfjlksdjflksdjlkjsdlfkjskdjfklsdjflksdjfsldfjskdfjlsdkfj'}}

            console.log(sessionFactory.getLoggedInUser()['id']);
            // $scope.workingSet = [{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"}];
            $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                $scope.workingSet = response['data'];
            });

            this.refreshWorkingSet = function(){
                $scope.loading = true;
                $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                    $scope.workingSet = response['data'];
                    console.log("refreshed");
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
