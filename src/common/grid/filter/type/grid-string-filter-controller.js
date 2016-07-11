angular.module('grid.gridStringFilterCtrl', [])

    .controller('gridStringFilterCtrl', ['$scope', 'API', '$http',

        function ($scope, API, $http) {

            var init = function () {

                var url = API.url + $scope.filter.resourceUrl + '?';

                var params = [];
                if ($scope.form.search !== '') {
                   params.push('cSearch=' + $scope.form.search);
                }

                params.push('cPerPage=5');

                $http.get(url + params.join('&')).then(function (response) {

                    $scope.filter.setResults(response.data.data);

                });

            };

            $scope.form = {
                search: ''
            };

            // $scope.update = function () {

            //     init();

            // };

            $scope.refresh = function () {

                $scope.filter.refresh();
                $scope.update();
                $scope.$emit('grid.updateSelectionString');

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
                init();
            };

            init();

        }

    ])
;
