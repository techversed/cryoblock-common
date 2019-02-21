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
                    obj: '=',
                    allowCreate: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/single-relation/partials/grid-form-single-relation-column-directive-tpl.html',

                controller: function ($scope) {

                    // Needle is what you are searching for -- I adopted this convention from the needle haystack
                    // Index is the
                    var getIndex = function (needle, haystack) {

                        for (i=0; i<haystack.length; i++){

                            if(haystack[i]==needle) return i;
                        }

                        return -1;

                    }

                    var init = function () {

                        // $scope.catalog = {};
                        // $scope.sample = {'catalog': {}};

                        // console.log("Running the init funciton in the grid form single relation column directive.");

                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];

                        // $scope.highlightedThing = 'asdf3';
                        // Is the index of the currently highlighted option -- only comes into play if the hightlighted thing does not appear in the list or has not been moved from its default setting

                        $scope.highlightedElement = $scope.suggestionList[0];

                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                    };

                    $scope.keyPressHandler = function (event, item){

                        console.log("key:", event.key);

                        if (event.key == "Enter") {

                            // This needs to be rewritten. -- need to get item from some location other than the function parameters.

                            console.log(event);
                            $scope.selectItem($scope.highlightedElement);
                        }

                        else if (event.key == "ArrowDown") {

                            // Should move onto the next item in the list if there is one
                            console.log("pressed Arrow down");

                            // var index = $scope.suggestionList.find( findFunction(element, index, $scope.highlightedElement) );
                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index+1 < $scope.suggestionList.length) {
                                $scope.highlightedElement = $scope.suggestionList[index+1];
                            }
                        }

                        else if (event.key == "ArrowUp") {

                            console.log("pressed Arrow up");

                            // var index = $scope.suggestionList.find( findFunction(element, index, $scope.highlightedElement) );
                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index - 1 >= 0) {
                                $scope.highlightedElement = $scope.suggestionList[index-1];
                            }
                            // Should move onto the previous item in the list if there is one.

                            console.log($scope.highlightedElement);

                        }

                        else if (event.key == "Backspace") {

                            console.log("pressed");

                        }
                    };

                    $scope.selectItem = function (item) {

                        // console.log("item", item);
                        // console.log("Selecting a new item");
                        $scope.selectedThing.name = item;

                        // console.log("selectedThing", $scope.selectedThing);
                    };

                    $scope.stopClickPropagation = function (actionevent) {

                        // console.log($scope.selectedThing);
                        // console.log("stopping the click from propagating");
                        // console.log("event:", actionevent);
                        actionevent.stopPropagation();
                    };

                    $scope.testing = function () {
                        // console.log('testing');
                    };

                    init();

                }
            };
        }
    ]
);
