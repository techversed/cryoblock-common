/*
    Under construction

    Need to add a way to create a new a new entry if a name does not exist.
    Allow the user to select one of a certain type of object.
    Boolean to allow for the creation of new objects.

    column -- bind to


    // Make is to that the top element is highlighted -- can press arrow key to move it down...

*/

angular.module('gridForm.gridFormColumn.gridFormSingleRelationColumnDirective', [])
    .directive('gridFormSingleRelationColumn', [

        function () {

            return {

                scope: {
                    obj: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/single-relation/partials/grid-form-single-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    var init = function () {

                        // $scope.catalog = {};
                        // $scope.sample = {'catalog': {}};

                        console.log("Running the init funciton in the grid form single relation column directive.");

                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];

                        $scope.highlightedThing = 'asdf3';

                        // Is the index of the currently highlighted option -- only comes into play if the hightlighted thing does not appear in the list or has not been moved from its default setting
                        $scope.highlightedNumber = 0;

                        $scope.selectedThing = {};
                        $scope.selectedThing.name = 'asdf1';

                    };


                    $scope.pressedEnter = function (event, item){


                        console.log(event);


                        // $scope.selectItem(item);
                    };

                    $scope.selectItem = function (item) {

                        console.log("item", item);
                        console.log("Selecting a new item");
                        $scope.selectedThing.name = item;

                        console.log("selectedThing", $scope.selectedThing);
                    };

                    $scope.stopClickPropagation = function (actionevent) {

                        console.log($scope.selectedThing);
                        console.log("stopping the click from propagating");
                        console.log("event:", actionevent);
                        actionevent.stopPropagation();
                    };

                    $scope.testing = function () {
                        console.log('testing');
                    };

                    init();

                }
            };
        }
    ]
);
