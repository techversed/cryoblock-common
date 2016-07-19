angular.module('form.oneToManyDirective', [])

    .directive('oneToMany', [

        function () {

            return {

                restrict: 'E',

                templateUrl: 'common/form/one-to-many/partials/one-to-many-tpl.html',

                scope: {
                    oneToManyModel: '=',
                    oneToManyModelProperty: '@'
                },

                controller: function ($scope) {

                    var model = $scope.oneToManyModel;
                    var property = $scope.oneToManyModelProperty;

                    if (model[property] === undefined) {
                        model[property] = [];
                    }

                    $scope.selectedItems = model[property];

                    // $scope.getSamples = function (search) {

                    //     var filteredItemIds = $scope.selectedItems.map(function (selectedItem) {
                    //         return selectedItem.id;
                    //     });

                    //     filteredItemIds.push(model.id);

                    //     return sampleFactory.getSamples(
                    //         {
                    //             search:search,
                    //             perPage: 5,
                    //             filteredIds: filteredItemIds
                    //         }
                    //     ).then(function (data) {
                    //         return data.data;
                    //     });

                    // };

                    $scope.onSelect = function (item) {
                        $scope.selectedItems.push(item);
                        $scope.searchModel = '';
                        console.log(model);
                    };

                    $scope.removeItem = function (item) {
                        $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1);
                    };

                },

                link: function ($scope, element, attrs) {

                    element.on('click', function () {
                        element.find('input').focus();
                    });

                }

            }

        }
    ])

;
