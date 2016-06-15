angular.module('form.oneToManyV2Directive', [])

    .directive('oneToManyV2', ['gridFactory', 'sampleFactory',

        function (gridFactory, sampleFactory) {

            return {

                require: '^form',

                restrict: 'E',

                templateUrl: 'common/form/one-to-many-v2/partials/one-to-many-v2-tpl.html',

                scope: {
                    grid: '=',
                    parentObject: '=',
                    bindTo: '@'
                },

                controller: function ($scope) {

                    $scope.getSamples = function (search) {

                        // var filteredItemIds = $scope.selectedItems.map(function (selectedItem) {
                        //     return selectedItem.id;
                        // });

                        // filteredItemIds.push(model.id);

                        return sampleFactory.getSamples(
                            {
                                search:search,
                                perPage: 5
                                // filteredIds: filteredItemIds
                            }
                        ).then(function (data) {

                            return data.data;

                        });

                    };

                    $scope.onSelect = function (item) {

                        $scope.grid.addItem(item);
                        $scope.search = '';
                        $scope.$emit('form:changed');

                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                    $scope.$on('form:changed', function () {
                        formCtrl.$pristine = false;
                    });

                    $scope.$on('form:submit', function () {

                        // if nothing was changed
                        if ($scope.grid.removingItemIds.length === 0 && $scope.grid.addingItemIds.length === 0) {

                            return;

                        }

                        if ($scope.parentObject[$scope.bindTo] === undefined) {
                            $scope.parentObject[$scope.bindTo] = {};
                        }

                        $scope.parentObject[$scope.bindTo].parentId = $scope.parentObject.id;
                        $scope.parentObject[$scope.bindTo].removing = $scope.grid.removingItemIds;
                        $scope.parentObject[$scope.bindTo].adding = $scope.grid.addingItemIds;

                    });

                }

            }

        }

    ])

;
