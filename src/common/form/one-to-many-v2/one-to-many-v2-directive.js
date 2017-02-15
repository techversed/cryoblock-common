angular.module('form.oneToManyDirective', [])

    .directive('oneToMany', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {

                require: '^form',

                restrict: 'E',

                templateUrl: 'common/form/one-to-many-v2/partials/one-to-many-v2-tpl.html',

                scope: {
                    grid: '=',
                    searchGrid: '=',
                    parentObject: '=',
                    bindTo: '@',
                    resourceUrl: '@',
                    placeholder: '@'
                },

                controller: function ($scope) {

                    $scope.getResults = function (search) {

                        var url = API.url + $scope.resourceUrl;
                        var params = [];

                        params.push('cPerPage=5');
                        params.push('cSearch=' + search);

                        return $http.get(url + '?' + params.join('&')).then(function (response) {

                            return response.data.data;

                        });

                    };

                    $scope.showGrid = false;
                    $scope.showSelectGrid = false;

                    $scope.toggle = function () {

                        if ($scope.grid.initResultCount === 0) {
                            return;
                        }

                        $scope.showSelectGrid = false;
                        $scope.showGrid = $scope.showGrid ? false : true;
                    };

                    $scope.toggleAdd = function () {
                        $scope.showGrid = false;
                        $scope.showSelectGrid = $scope.showSelectGrid ? false : true;
                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.$on('form:changed', function () {
                        formCtrl.$pristine = false;
                    });

                    $scope.$on('form:submit', function () {

                        // if nothing was changed
                        if ($scope.grid.removingItemIds.length === 0 && $scope.searchGrid.addingItemIds.length === 0) {

                            return;

                        }

                        if ($scope.parentObject[$scope.bindTo] === undefined) {
                            $scope.parentObject[$scope.bindTo] = {};
                        }

                        $scope.parentObject[$scope.bindTo].parentId = $scope.parentObject.id;
                        $scope.parentObject[$scope.bindTo].removing = $scope.grid.removingItemIds;
                        $scope.parentObject[$scope.bindTo].adding = $scope.searchGrid.addingItemIds;

                    });

                }

            }

        }

    ])

;
