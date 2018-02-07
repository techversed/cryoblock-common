angular.module('storage.storageBoxHeading', [])
    .directive('storageBoxHeading', ['$window', 'storageDivisionManager',

        function ($window, storageDivisionManager) {

            return {

                restrict: 'A',
                require: '^storageBox',
                scope: {
                    row: '=',
                    column: '='
                },
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    element.css('font-size', (100 / 100) * 0.7 + 'vw');

                    $scope.$on('storage_box.resize', function (event, data) {

                        element.css('font-size', (data.percentage / 100) * 0.7 + 'vw');

                    });

                    element.on('click', function (e) {
                        if ($scope.column != undefined) {
                            storageDivisionManager.selectColumn($scope.column, e.shiftKey);
                        }
                        if ($scope.row != undefined) {
                            storageDivisionManager.selectRow($scope.row, e.shiftKey);
                        }
                        $scope.$apply();
                    });

                }

            };

        }

    ])
;
