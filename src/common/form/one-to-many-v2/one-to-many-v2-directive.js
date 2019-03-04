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
                    disabled: '=',
                    numRequired: '='
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

                        $scope.formCtrl.$pristine = false;
                        if ($scope.grid.initResultCount === 0 || $scope.disabled) {
                            return;
                        }

                        $scope.showSelectGrid = false;
                        $scope.showGrid = $scope.showGrid ? false : true;
                    };

                    $scope.checkValidity = function() {

                        var totalAfterSave = ($scope.grid.pagination.unpaginatedTotal || 0) - $scope.grid.removingItemIds.length + $scope.searchGrid.addingItemIds.length;


                        if ($scope.numRequired != undefined && totalAfterSave < $scope.numRequired) {
                            $scope.formCtrl[$scope.bindTo].$setValidity("numrequired", false);
                            $scope.requiredError = true;
                        } else {
                            $scope.formCtrl[$scope.bindTo].$setValidity("numrequired", true);
                        }
                    };

                    $scope.toggleAdd = function () {

                        $scope.formCtrl.$pristine = false;
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.showGrid = false;
                        $scope.showSelectGrid = $scope.showSelectGrid ? false : true;
                    };

                    $scope.grid.setSelectItemCallback($scope.checkValidity);
                    $scope.searchGrid.setSelectItemCallback($scope.checkValidity);


                },



                link: function ($scope, element, attrs, formCtrl) {

                    $scope.formCtrl = formCtrl;

                    $scope.$on('form:submit', function () {

                        if ($scope.parentObject[$scope.bindTo] === undefined) {
                            $scope.parentObject[$scope.bindTo] = {};
                        }

                        $scope.parentObject[$scope.bindTo].parentId = $scope.parentObject.id;
                        $scope.parentObject[$scope.bindTo].removing = $scope.grid.removingItemIds;
                        $scope.parentObject[$scope.bindTo].adding = $scope.searchGrid.addingItemIds;

                        $scope.checkValidity();

                    });

                }

            }

        }

    ])

;
