angular.module('step.cbStepsDirective', [])

    .directive('cbSteps', ['StepsService', '$timeout',

        function (StepsService, $timeout) {

            return {

                require: '^steps',
                scope: {
                    name: '@',
                    template: '@',
                    stepsData: '=',
                    parentScope: '=',
                    currentStep: '='
                },

                restrict: 'E',

                templateUrl: 'common/step/partials/cb-step-directive-tpl.html',

                link: function ($scope, element, attrs, stepsCtrl) {

                    $scope.$watch('currentStep', function (v) {
                        angular.forEach($scope.stepsData, function (stepData, key) {
                            if (stepData.name == v) {
                                $scope.currentStepIndex = key;
                            }
                        })
                    });

                    $scope.goTo = function (index) {

                        if (index >= $scope.currentStepIndex) {
                           return;
                        }

                        swal({
                            title: "Are you sure?",
                            text: "Going back will result in losing your current progress.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true
                        }, function() {
                            stepsCtrl.goTo(index);
                            $scope.$apply();
                        });

                    };

                }

            };

        }

    ])
;
