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
                    // $scope.wsm = workingSetManager;

                },

                controller: function ($scope) {
                    console.log("testing1");
                    $scope.wsm = workingSetManager;

                }

                // link: function ($scope, element, attrs, formCtrl) {
                    // $scope.formCtrl = formCtrl;
                    // console.log("testing2");
                // }
            };
        }
    ])
;
