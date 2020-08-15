angular.module('workingSet.workingSetDirective', [])

    .directive('workingSet',['workingSetManager', '$q',

        function (workingSetManager, $q) {

            return {

                require: '',
                restrict: 'E',
                templateUrl: 'common/working-set/partials/working-set-directive-tpl.html',
                scope: {

                },

                //Might not even need a link funciton
                link: function ($scope, element, attrs) {

                },

                controller: function ($scope) {

                    $scope.wsm = workingSetManager;
                    $scope.temp = "";

                }

            };
        }
    ])
;
