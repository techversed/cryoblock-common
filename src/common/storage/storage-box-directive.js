angular.module('storage.storageBoxDirective', [])
    .directive('storageBox', ['$window', 'storageDivisionManager',

        function ($window, storageDivisionManager) {

            return {

                restrict: 'A',
                scope: {
                    division: '='
                },
                controller: function ($scope, $rootScope) {
                    this.scope = $scope;
                    this.division = $scope.division;

                    $scope.sdm = storageDivisionManager;

                    this.selectColumn = function (column) {
                        $rootScope.$broadcast('storage_box.select_column', column);
                    }

                    this.selectRow = function (row) {
                        $rootScope.$broadcast('storage_box.select_row', row);
                    }
                },
                link: function ($scope, element, attrs) {

                    $scope.element = element;

                    $scope.$on('storage_box.resize', function (event, data) {

                        element.css('width', data.percentage + '%');

                    });

                    bodyEl = angular.element('body');

                    bodyEl.on('mousemove touchmove', function (event) {
                        $scope.sdm.drag(event);
                    });

                    // bodyEl.on('touchmove', function (event) {
                    //     $scope.sdm.drag(event);
                    // });

                    bodyEl.on('mouseup touchend', function (e) {
                        $scope.sdm.onMouseUp(e);
                    });


                }

            };

        }

    ])
;
