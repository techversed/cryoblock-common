angular.module('storage.sampleTypeIconDirective', [])

    .directive('sampleTypeIcon', ['sessionFactory', 'API', '$rootScope', 'sampleTypeIconMapping',

        function (sessionFactory, API, $rootScope, sampleTypeIconMapping) {
            return {
                restrict: 'E',
                sampleType: 'E',
                templateUrl: 'common/storage/partials/sample-type-icon-tpl.html',
                scope: {
                    sampleType: '='
                },
                link: function ($scope) {

                    $scope.initialize = function () {

                        $scope.sampleTypeIconMapping = sampleTypeIconMapping;

                    };

                    $scope.setIconSrc = function () {

                        $scope.iconSrc =  '/images/' + $scope.sampleTypeIconMapping[$scope.sampleType.name];

                    }

                    $scope.initialize();
                    $scope.setIconSrc();

                }
            }
        }
    ])
;
