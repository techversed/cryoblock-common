angular.module('grid.gridTimeFilterCtrl', [])

    .controller('gridTimeFilterCtrl', ['$scope', '$location',

        function ($scope, $location) {
            //enum copy
            var init = function () {

                if (!$scope.grid.bindToState) {
                    return;
                }

                var getParams = $location.search();

                withinParam = getParams[$scope.filter.filterProperty + '[' + $scope.filter.operators[0].value + ']'];
                morethanParam = getParams[$scope.filter.filterProperty + '[' + $scope.filter.operators[1].value + ']'];

                if (withinParam !== undefined && morethanParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.betweenStart = parseFloat(morethanParam);
                    $scope.filter.betweenEnd = parseFloat(withinParam);
                    $scope.filter.selectedType = 'between';
                    $scope.filter.updateSelectionString();

                } else if (withinParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedType = 'within';
                    $scope.filter.selectedOperator = $scope.filter.operators[0];
                    $scope.filter.singleValue = parseFloat(withinParam);
                    $scope.filter.updateSelectionString();

                } else if (morethanParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedType = 'more';
                    $scope.filter.selectedOperator = $scope.filter.operators[1];
                    $scope.filter.singleValue = parseFloat(morethanParam);
                    $scope.filter.updateSelectionString();

                }

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
                $scope.$emit('grid.refresh');
            };

            // datepicker for 3rd radio
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

            init();
        }

    ])
;
