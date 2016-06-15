angular.module('grid.gridRelationFilterCtrl', [])

    .controller('gridRelationFilterCtrl', ['$scope', 'API', '$http',

        function ($scope, API, $http) {

            var init = function () {

                var url = API.url + $scope.filter.resourceUrl + '?';

                var params = [];
                if ($scope.form.search !== '') {
                   params.push('cSearch=' + $scope.form.search);
                }

                params.push('cPerPage=5');


                // if ($sc.filteredIds !== undefined) {
                $scope.filter.selectedItems.map(function(item) {

                    params.push('cNot[id][]=' + item.id);

                });

                $http.get(url + params.join('&')).then(function (response) {

                    $scope.filter.setResults(response.data.data);

                });

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

            init();

        }

    ])
;
