angular.module('profile.profileRowActionsCtrl', [])

    .controller('profileRowActionsCtrl', ['$scope', 'proteinPurificationFormFactory', '$cbResource', '$state', '$stateParams', '$cbResource', 'sessionFactory', 'workingSetManager',

        function ($scope, proteinPurificationFormFactory, $cbResource, $state, $stateParams, $cbResource, sessionFactory, workingSetManager) {

            // $scope.dismissAll = function() {

                // $cbResource.create('/cryoblock/user-object-notification/dismiss-watche-requests', {});
            // }

            $scope.loggedInUser = sessionFactory.getLoggedInUser();

            // This makes it essential for the request to have a certain url layout
            $scope.addOutputsToWorkingSet = function(result) {

                // console.log(result);
                // linkedEntityDetail.objectUrl
                var url = result.linkedEntityDetail.objectUrl;
                url = url.split("/")
                url.pop();
                url = url.join("/");
                url += "/request-output-sample/request/";
                url += result.entity.id;

                var params = undefined;

                $cbResource.get(url, params).then(function(response){


                    // console.log('data:', response.data);
                    workingSetManager.addItems("", response.data);
                    // console.log(response);

                });


     // * @Route("/production/antigen/request-input-sample/{type}/{id}", name="antigen_request_input_sample_get")




            }

            $scope.dismissNotification = function(result) {
                // result.dismissed=true;
                var result2 = angular.copy(result);
                result2.dismissed = true;

                var params = {'id[EQ]': result.id};

                $cbResource.update('/cryoblock/user-object-notification', result2, params).then(
                    function(response){
                        // result = result2;
                        result.dismissed = true;
                    }
                );
            }


            $scope.stopWatching = function(result){

                var data = {
                    'linkedEntityDetailId[EQ]': result.linkedEntityDetail.id,
                    'entityId[EQ]': result.entityId,
                    'userId[EQ]': $scope.loggedInUser.id
                };

                $cbResource.delete('/cryoblock/user-object-notification', data).then(function (response) {
                    $state.go($state.current, $stateParams, {reload:true});
                    toastr.success('You are no longer watching ' + $scope.objectDescription + ' ' + $scope.entityId);
                });

            }




        }
    ])
;
