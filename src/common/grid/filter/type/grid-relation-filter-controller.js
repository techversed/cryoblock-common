angular.module('grid.gridRelationFilterCtrl', [])

    .controller('gridRelationFilterCtrl', ['$scope', 'API', '$cbResource', '$location', 'gridManager',

        function ($scope, API, $cbResource, $location, gridManager) {

            var init = function (first) {

                var url = $scope.filter.resourceUrl;

                var params = {};
                if ($scope.form.search !== '') {
                   params.cSearch =  $scope.form.search;
                }

                params.cPerPage = 25;

                var paramKey = $scope.filter.filterProperty + '[IN]';

                getParams = $location.search();

                if ($scope.grid.bindToState && (first != undefined) && getParams[paramKey] && !gridManager.ignoreUrlParams) {

                    $scope.filter.isVisible = true;

                    var itemIds = getParams[paramKey];

                    if (itemIds) {

                        $cbResource.get(url, {'id[EQ]': itemIds}).then(function (response) {

                            angular.forEach(response.data, function (item) {

                                $scope.filter.selectItem(item);

                            })

                            if ($scope.filter.selectedItems.length) {

                                params['id[NE]'] = $scope.filter.selectedItems.map(function(item) {

                                    return item.id;

                                });

                            }

                            $cbResource.get(url, params).then(function (response) {

                                $scope.filter.setResults(response.data);

                            });
                        })
                    }

                } else {

                    if ($scope.filter.selectedItems.length) {

                        params['id[NE]'] = $scope.filter.selectedItems.map(function(item) {

                            return item.id;

                        });

                    }

                    $cbResource.get(url, params).then(function (response) {

                        $scope.filter.setResults(response.data);

                    });

                }

            };

            $scope.form = {
                search: ''
            };

            $scope.search = function () {

                init();

            };

            $scope.selectItem = function (item) {
                $scope.filter.selectItem(item);
                init();
                $scope.$emit('grid.refresh');
            };

            $scope.removeItem = function (item) {
                $scope.filter.removeItem(item);
                init();
                $scope.$emit('grid.refresh');
            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.filter.clear();
                $scope.$emit('grid.filterToggle');
                $scope.$emit('grid.refresh');
                init();
            };

            init(true);

        }

    ])
;
