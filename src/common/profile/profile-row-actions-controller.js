angular.module('profile.profileRowActionsCtrl', [])

    .controller('profileRowActionsCtrl', ['$scope', 'proteinPurificationFormFactory', '$cbResource', '$state', '$stateParams', '$cbResource', 'sessionFactory',

        function ($scope, proteinPurificationFormFactory, $cbResource, $state, $stateParams, $cbResource, sessionFactory) {

            // $scope.dismissAll = function() {

                // $cbResource.create('/cryoblock/user-object-notification/dismiss-watche-requests', {});
            // }

            $scope.loggedInUser = sessionFactory.getLoggedInUser();

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
