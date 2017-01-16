angular.module('grid.gridTimeFilterCtrl', [])

    .controller('gridTimeFilterCtrl', ['$scope', '$location',

        function ($scope, $location) {
            //enum copy
            var init = function () {

                if (!$scope.grid.bindToState) {
                    return;
                }

                var getParams = $location.search();
                var initParam = getParams[$scope.filter.filterProperty + '[IN]']

                if (initParam !== undefined) {
                    $scope.filter.isVisible = true;
                    $scope.filter.selectItem(initParam);
                }

            };

            // datepicker for 3rd checkbox
            if ($scope.betweenDate = true) {
                $scope.todayStart = function() {
                    $scope.start = new Date();
                };

                $scope.todayEnd = function() {
                    $scope.end = new Date();
                };

                $scope.todayStart();
                $scope.todayEnd();

                $scope.clearStart = function() {
                    $scope.start = null
                };

                $scope.clearEnd = function() {
                    $scope.end = null
                };

                $scope.open1 = function() {
                    $scope.popup1.opened = true;
                };

                $scope.open2 = function() {
                    $scope.popup2.opened = true;
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.popup2 = {
                    opened: false
                };
            }


            // enum copy
            $scope.form = {
                search: ''
            };

            $scope.selectType = function (type) {
                $scope.filter.selectType(type);
                $scope.$emit('grid.refresh');
            };

            $scope.removeType = function (type) {
                $scope.filter.removeType(type);
                $scope.$emit('grid.refresh');
            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.clear();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

            init();
        }

    ])
;
