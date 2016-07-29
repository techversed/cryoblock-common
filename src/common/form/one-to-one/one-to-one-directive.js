angular.module('form.oneToOne.oneToOneDirective', [])

    .directive('oneToOne', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {

                require: '^form',

                restrict: 'E',

                templateUrl: 'common/form/one-to-one/partials/one-to-one-tpl.html',

                scope: {
                    grid: '=',
                    parentObject: '=',
                    bindTo: '@',
                    resourceUrl: '@',
                    placeholder: '@'
                },

                controller: function ($scope) {

                    if ($scope.parentObject[$scope.bindTo]) {

                        $scope.grid.selectItem($scope.parentObject[$scope.bindTo]);

                    }

                    $scope.$watch('grid.selectedItem', function (v) {

                        $scope.parentObject[$scope.bindTo] = v;

                    });

                    // $scope.getResults = function (search) {

                    //     var url = API.url + $scope.resourceUrl;
                    //     var params = [];

                    //     params.push('cPerPage=5');
                    //     params.push('cSearch=' + search);

                    //     return $http.get(url + '?' + params.join('&')).then(function (response) {

                    //         return response.data.data;

                    //     });

                    // };

                    $scope.onSelect = function (item) {

                        // $scope.grid.addItem(item);
                        // $scope.search = '';
                        $scope.$emit('form:changed');

                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.$on('form:changed', function () {
                        formCtrl.$pristine = false;
                    });

                    // $scope.$on('form:submit', function () {

                    //     // if nothing was changed
                    //     if ($scope.grid.removingItemIds.length === 0 && $scope.grid.addingItemIds.length === 0) {

                    //         return;

                    //     }

                    //     if ($scope.parentObject[$scope.bindTo] === undefined) {
                    //         $scope.parentObject[$scope.bindTo] = {};
                    //     }

                    //     $scope.parentObject[$scope.bindTo].parentId = $scope.parentObject.id;
                    //     $scope.parentObject[$scope.bindTo].removing = $scope.grid.removingItemIds;
                    //     $scope.parentObject[$scope.bindTo].adding = $scope.grid.addingItemIds;

                    // });

                }

            }

        }

    ])

;
