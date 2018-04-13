angular.module('grid.gridDateFilterCtrl', [])

    .controller('gridDateFilterCtrl', ['$scope', '$location',

        function ($scope, $location) {

            var init = function () {

                if (!$scope.grid.bindToState) {
                    return;
                }

                var getParams = $location.search();

                lteParam = getParams[$scope.filter.filterProperty + '[' + $scope.filter.operators[0].value + ']'];
                gteParam = getParams[$scope.filter.filterProperty + '[' + $scope.filter.operators[1].value + ']'];

                if (lteParam !== undefined && gteParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.betweenStart = new Date(moment(gteParam));
                    $scope.filter.betweenEnd = new Date(moment(lteParam));
                    $scope.filter.selectedType = 'between';
                    $scope.filter.updateSelectionString();

                } else if (lteParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedType = 'single';
                    $scope.filter.selectedOperator = $scope.filter.operators[0];
                    $scope.filter.singleValue = new Date(moment(lteParam));
                    $scope.filter.updateSelectionString();

                } else if (gteParam !== undefined) {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedType = 'single';
                    $scope.filter.selectedOperator = $scope.filter.operators[1];
                    $scope.filter.singleValue = new Date(moment(gteParam));
                    $scope.filter.updateSelectionString();

                }

            }

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
                $scope.filter.refresh();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

            init();

        }

    ])
;
