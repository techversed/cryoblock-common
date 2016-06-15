angular.module('grid.gridEnumFilterCtrl', [])

    .controller('gridEnumFilterCtrl', ['$scope',

        function ($scope) {

            $scope.form = {
                search: ''
            };

            $scope.search = function () {

            };

            $scope.selectItem = function (item) {
                $scope.filter.selectItem(item);
                $scope.$emit('grid.refresh');
            };

            $scope.removeItem = function (item) {
                $scope.filter.removeItem(item);
                $scope.$emit('grid.refresh');
            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.clear();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

        }

    ])
;
