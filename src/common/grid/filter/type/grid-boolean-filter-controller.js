angular.module('grid.gridBooleanFilterCtrl', [])

    .controller('gridBooleanFilterCtrl', ['$scope', '$location',

        function ($scope, $location) {

            $scope.form = {
                radioModel: "Any"
            };

            var init = function () {

                if (!$scope.grid.bindToState) {
                    return;
                }

                var getParams = $location.search();
                console.log(getParams)
                var boolParam = getParams[$scope.filter.filterProperty + '[EQ]'];

                if (boolParam === "0" || boolParam === "1") {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.setFromState(boolParam);
                    $scope.filter.updateSelectionString();

                }

            }

            $scope.filter.form = $scope.form;

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
