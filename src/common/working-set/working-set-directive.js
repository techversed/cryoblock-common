angular.module('workingSet.workingSetDirective', [])

    .directive('workingSet',['sessionFactory', '$cbResource', 'workingSetManager',

        function (sessionFactory, $cbResource, workingSetManager) {

            return {

                require: '',
                restrict: 'E',
                templateUrl: 'common/working-set/partials/working-set-directive-tpl.html',
                scope: {

                },

                link: function ($scope, element, attrs) {
                    $scope.wsm = workingSetManager;

                },

                controller: function ($scope, $rootScope) {
                    console.log("testing1");
                    // console.log(sessionFactory.getLoggedInUser().id);
                    // $scope.loading = false;

                    // // I kinda wanna listen to the root scope and have an on event which makes it so that whenever things are added to the workignset the refresh function gets called -- or they could be added one by one.

                    // // console.log($rootScope);
                    // // Moved from the old location to being its own directive
                    // $scope.deselectAll = function(){
                    //     $scope.data = $scope.data.map(function(entity){
                    //         entity.selected = false;
                    //         return entity;
                    //     });
                    // }

                    // $scope.selectAll = function(){
                    //     $scope.data = $scope.data.map(function(entity){
                    //         entity.selected = true;
                    //         return entity;
                    //     });
                    // }

                    // $scope.createRequest = function(ent){
                    //     console.log(ent);
                    // }

                    // $scope.refresh = function() {
                    //     if($scope.loading == true){
                    //         return;
                    //     }

                    //     $scope.loading = true;

                    //     $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {
                    //         var resData = response['data'];
                    //         var scopeData;

                    //         if ($scope.data == undefined) {
                    //             console.log("it was undefined");
                    //              scopeData = [{"id":1}];
                    //         }
                    //         else {
                    //             scopeData = $scope.data
                    //         }

                    //         var scopeDataIds = scopeData.map(function(entry){
                    //             return entry.id
                    //         });

                    //         var resDataIds = resData.map(function(entry){
                    //             return entry.id
                    //         });

                    //         scopeData = scopeData.filter(function(entry){
                    //             return resDataIds.indexOf(entry.id)!=-1;
                    //         });

                    //         resData = resData.filter(function(entry){
                    //             return scopeDataIds.indexOf(entry.id)==-1;
                    //         });

                    //         resData = resData.map(function(entry){
                    //             entry.selected = false;
                    //             return entry;
                    //         });

                    //         $scope.data = scopeData.concat(resData);
                    //         $scope.loading = false;
                    //     });
                    // };
                    // $scope.refresh();

                    // $scope.refreshWorkingSet1 = function(){
                    //     $scope.loading = true;
                    //     $cbResource.get('/storage/working-set-sample/user/194', {}, true).then(function (response) {
                    //         $scope.workingSet = response['data'];
                    //         $scope.loading = false;
                    //     });
                    // };


                    // $scope.data = [
                    //     {
                    //         'name':'id',
                    //         'catalog': 'catalog',
                    //         'bool': true,
                    //         'otherProperty': 'test2'
                    //     },
                    //     {
                    //         'name':'test2',
                    //         'catalog': 'catalog',
                    //         'bool': true,
                    //         'otherProperty': 'test2'
                    //     },
                    //     {
                    //         'name':'test3',
                    //         'catalog': 'catalog',
                    //         'bool': false,
                    //         'otherProperty': 'test2'
                    //     }
                    // ];
                }

                // link: function ($scope, element, attrs, formCtrl) {
                    // $scope.formCtrl = formCtrl;
                    // console.log("testing2");
                // }
            };
        }
    ])
;
