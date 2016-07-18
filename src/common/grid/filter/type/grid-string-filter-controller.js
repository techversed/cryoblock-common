angular.module('grid.gridStringFilterCtrl', [])

    .controller('gridStringFilterCtrl', ['$scope',

        function ($scope) {

            $scope.form = {
                search: ''
            };

            $scope.refresh = function () {

                $scope.filter.refresh();
                $scope.update();

            };

            $scope.update = function () {

                $scope.$emit('grid.refresh');

            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.clear();
                $scope.$emit('grid.filterToggle');
                $scope.update();
            };

        }

    ])
;
