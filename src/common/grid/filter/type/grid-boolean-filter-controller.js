angular.module('grid.gridBooleanFilterCtrl', [])

    .controller('gridBooleanFilterCtrl', ['$scope', '$location', 'gridManager',

        function ($scope, $location, gridManager) {
            console.log($scope);

            $scope.form = {
                radioModel: "Any"
            };

            var init = function () {

                console.log(gridManager.ignoreUrlParams);
                console.log("!bintostate", !$scope.grid.bindToState);
                if (!$scope.grid.bindToState || gridManager.ignoreUrlParams) {
                    // $scope.form.radioModel = "Yes";
                    // $scope.filter.updateSelectionString();
                    // $scope.filter.isFiltering = true;
                    // $scope.refresh();


                    return;
                }

                var getParams = $location.search();
                console.log("getParams", getParams);

                var boolParam = getParams[$scope.filter.filterProperty + '[EQ]'];

                if (boolParam === "0" || boolParam === "1") {

                    $scope.filter.isVisible = true;
                    $scope.filter.isFiltering = true;
                    $scope.filter.setFromState(boolParam);
                    $scope.filter.updateSelectionString();

                }

            }

            $scope.watch(filter.form.radioModel, function(){
                    $scope.form.radioModel = $scope.filter.form.radioModel;
                    $scope.filter.isFiltering = true;
            })

            $scope.refresh = function () {

                $scope.filter.refresh();
                $scope.update();

            };

            $scope.update = function () {
                console.log("update");
                $scope.$emit('grid.refresh');

            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.refresh();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
            };

            // If the user is not manually setting up filter
            console.log("scope.filter.form", $scope.filter.form);
            console.log("scope.filter.form", !$scope.filter.form);
            if(!$scope.filter.form){
                $scope.filter.form = $scope.form;
            }
            else {
                $scope.filter.refresh();
            }

            init();

        }

    ])
;
