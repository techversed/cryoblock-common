angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', '$cbResource', '$cbGridBuilder',

        function ($scope, sessionFactory, navigationInitializer, $cbResource, $cbGridBuilder) {

            // $('.dropdown.keep-open').on({
            //         "shown.bs.dropdown": function() { this.closable = false; },
            //         "click":             function() { this.closable = true; },
            //         "hide.bs.dropdown":  function() { return this.closable; }
            // });

            // $('.keep-open').on({
            //     "shown.bs.dropdown": function() { $(this).attr('closable', false); },
            //     //"click":             function() { }, // For some reason a click() is sent when Bootstrap tries and fails hide.bs.dropdown
            //     "hide.bs.dropdown":  function() { return $(this).attr('closable') == 'true'; }
            // });

            // $('.keep-open').children().first().on({
            //   "click": function() {
            //     $(this).parent().attr('closable', true );
            //   }
            // })

            $scope.workingSet = {'id': 1111, 'catalog':{'stringLabel': 'asdlkjsdflkjsdflsdfjlsdkfjlsldkslkjfldkjsflksdjflksdjflkdjsflkjfjsldkfjlsdkfjlsdkjflskdjflskdjflskdjflksdjflksdjflskdjfldksjflksdfjlksdjflksdjlkjsdlfkjskdjfklsdjflksdjfsldfjskdfjlsdkfj'}}

            // console.log(sessionFactory.getLoggedInUser()['id']);
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
                // $scope.loading = true;
                var returnedList = [];

                console.log(sessionFactory.getLoggedInUser());
                returnedList.push(sessionFactory.getLoggedInUser());

                $cbGridBuilder.buildIndex('sampleGridFactory', {selectFilterGroups : {'Working Set': returnedList}}).then( function (response) {
                    $scope.grid = response;
                });

                // $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                //     $scope.grid = response['data'];
                //     console.log("refreshed");
                //     $scope.loading = false;
                // });

            };

            // $cbGridBuilder.buildIndex('sampleGridFactory').then( function (response){
            //     $scope.grid = response;
            // });

            // var returnedList = [];
            // returnedList.push(sessionFactory.getLoggedInUser());
            returnedList = (sessionFactory.getLoggedInUser());
            $cbGridBuilder.buildIndex('sampleGridFactory', {selectFilterGroups : {'Working Set': returnedList}}).then( function (response) {
                console.log("response", response);
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
