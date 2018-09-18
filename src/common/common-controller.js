angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', '$cbResource', '$cbGridBuilder',

        function ($scope, sessionFactory, navigationInitializer, $cbResource, $cbGridBuilder) {
            $scope.workingSet = {'id': 1111, 'catalog':{'stringLabel': 'asdlkjsdflkjsdflsdfjlsdkfjlsldkslkjfldkjsflksdjflksdjflkdjsflkjfjsldkfjlsdkfjlsdkjflskdjflskdjflskdjflksdjflksdjflskdjfldksjflksdfjlksdjflksdjlkjsdlfkjskdjfklsdjflksdjfsldfjskdfjlsdkfj'}}

            console.log(sessionFactory.getLoggedInUser()['id']);
            // $scope.workingSet = [{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"},{"text": "testing"}];
            $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                $scope.workingSet = response['data'];
            });

            this.refreshWorkingSet1 = function(){
                $scope.loading = true;
                $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                    $scope.workingSet = response['data'];
                    console.log("refreshed");
                    $scope.loading = false;
                });
            };


            this.refreshWorkingSet2 = function(){
                $scope.loading = true;
                $cbGridBuilder.buildIndex('sampleGridFactory').then( function (response){
                    $scope.grid = response;
                });

                // $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                //     $scope.grid = response['data'];
                //     console.log("refreshed");
                //     $scope.loading = false;
                // });

            };

            $cbGridBuilder.buildIndex('sampleGridFactory').then( function (response){
                $scope.grid = response;
            });

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
