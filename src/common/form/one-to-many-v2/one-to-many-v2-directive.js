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
                    placeholder: '@',
                    disabled: '='
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

                        $scope.$emit('form:changed');
                        if ($scope.grid.initResultCount === 0 || $scope.disabled) {
                            return;
                        }

                        $scope.showSelectGrid = false;
                        $scope.showGrid = $scope.showGrid ? false : true;
                    };

                    $scope.toggleAdd = function () {
                        $scope.$emit('form:changed');
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.showGrid = false;
                        $scope.showSelectGrid = $scope.showSelectGrid ? false : true;
                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.attrs = attrs;

                    $scope.$on('form:changed', function(){
                        if (!$scope.attrs.required || $scope.disabled) {
                            formCtrl[$scope.attrs.name].$setValidity("req", true);
                        }
                        else if (($scope.grid.results.length + $scope.searchGrid.addingItemIds.length - $scope.grid.removingItemIds.length) == 0) {
                            formCtrl[$scope.attrs.name].$setValidity("req", false); //using req instead of required because the regular validator still seems to be running and causing issues if they both can set the property ['required']
                        }
                        else {
                            formCtrl[$scope.attrs.name].$setValidity("req", true);
                        }
                    });

                    $scope.$on('form:submit', function () {
                        $scope.$emit('form:changed');

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
