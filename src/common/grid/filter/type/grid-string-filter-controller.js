angular.module('grid.gridStringFilterCtrl', [])

    .controller('gridStringFilterCtrl', ['$scope', '$location',

        function ($scope, $location) {

            var init = function () {

                if (!$scope.grid.bindToState) {
                    return;
                }

                var getParams = $location.search();

                var likeParamKey = $scope.filter.filterProperty + '[' + $scope.filter.operators[0].value + ']';
                var likeParam = getParams[likeParamKey];

                var eqParamKey = $scope.filter.filterProperty + '[' + $scope.filter.operators[1].value + ']';
                var eqParam = getParams[eqParamKey];

                if (likeParam !== undefined) {
                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedOperator = $scope.filter.operators[0];
                    $scope.filter.singleValue = likeParam;
                    $scope.filter.updateSelectionString();
                }

                if (eqParam !== undefined) {
                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.selectedOperator = $scope.filter.operators[1];
                    $scope.filter.singleValue = eqParam;
                    $scope.filter.updateSelectionString();
                }

            };

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

            init();
        }

    ])
;
