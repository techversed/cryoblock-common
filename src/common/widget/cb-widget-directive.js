angular.module('widget.cbWidgetDirective', [])

    .directive('cbWidget', ['$cbResource', '$interval',

        function ($cbResource, $interval) {

            return {

                scope: {
                    pollUrl: '@',
                    title: '@',
                    type: '@',
                    iconClass: '@',
                    pollFrequency: '@'
                },

                restrict: 'E',

                templateUrl: 'common/widget/partials/cb-widget-directive-tpl.html',

                controller: function ($scope) {

                    if ($scope.type == undefined) {
                        $scope.type = 'success';
                    }

                    if ($scope.pollFrequency == undefined) {
                        $scope.pollFrequency = 20000;
                    }

                    $scope.poll = function () {
                        $cbResource.count($scope.pollUrl, undefined, true).then(function (total) {
                            $scope.pollResult = total;
                        });
                    }

                    $scope.poll();

                    $scope.intervalPromise = $interval($scope.poll, $scope.pollFrequency);
                    $scope.$on('$destroy', function() {
                        $interval.cancel($scope.intervalPromise);
                    });
                }

            };

        }

    ])
;
