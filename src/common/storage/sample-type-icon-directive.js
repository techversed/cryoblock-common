angular.module('storage.sampleTypeIconDirective', [])

    /*
        TAYLOR-- This directive assumes that 'sampleTypeIconMapping' is defined in the local branch that implements this...
        It would probably be a good idea to at least have the default icon mapping located in common... happy with whatever.

    */

    .directive('sampleTypeIcon', ['sampleTypeIconMapping',

        function (sampleTypeIconMapping) {
            return {
                restrict: 'E',
                templateUrl: 'common/storage/partials/sample-type-icon-tpl.html',
                scope: {
                    sampleType: '='
                },
                link: function ($scope) {

                    $scope.initialize = function () {

                        $scope.sampleTypeIconMapping = sampleTypeIconMapping;

                    };

                    $scope.setIconSrc = function () {
                        var mapping;

                        if ($scope.sampleTypeIconMapping[$scope.sampleType.name]==undefined) {
                                mapping = $scope.sampleTypeIconMapping["default"];
                        }
                        else {
                            mapping = $scope.sampleTypeIconMapping[$scope.sampleType.name];
                        }

                        $scope.iconSrc = '/images/' + mapping;

                    }

                    $scope.initialize();
                    $scope.setIconSrc();

                }
            }
        }
    ])
;
