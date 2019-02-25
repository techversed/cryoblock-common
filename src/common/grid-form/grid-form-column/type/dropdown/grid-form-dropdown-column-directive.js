/*
    Gridform Dropdown Column
    Written by Taylor Jones

    This column type is used when there is a finite list of possible inputs for a given field.
    Unlike the relations this dropdown does not have any communication with the backend.
    Searching will be performed within the interface


    minselectable
    maxselectable

    selectMultiple -- true or false. checkbox or radio buttons
*/

angular.module('gridForm.gridFormColumn.gridFormDropdownColumnDirective', [])
    .directive('gridFormDropdownColumn', [

        function () {

            return {

                scope: {
                    obj: '=',
                    minselectable: '@',
                    maxselectable: '@',
                },
                    // selectMultiple: '='

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/dropdown/partials/grid-form-dropdown-column-directive-tpl.html',

                controller: function ($scope) {

                    // Needle is what you are searching for -- I adopted this convention from the needle haystack
                    // Index is the
                    var getIndex = function (needle, haystack) {

                        for (i=0; i<haystack.length; i++){

                            if(haystack[i]==needle) return i;
                        }

                        return -1;

                    }

                    var initArray = function (value, count) {
                        var tmp = [];

                        for(i=0; i<count;i++){
                            tmp.push(value);
                        }

                        return tmp;

                    }

                    var init = function () {

                        // If not specified assume that you are selecting a single one
                        $scope.selectMultiple = $scope.selectMutiple ? $scope.selectMultiple : true; // In the final version this will be passed in with scope.

                        // Properties if selecting single
                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];
                        $scope.highlightedElement = $scope.suggestionList[0];
                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                        // Properties if selecting many
                        $scope.multiSelectedBool = true;
                        $scope.multiSelected = {};
                        for(var i = 0; i < $scope.suggestionList.length; i++){
                            $scope.multiSelected[$scope.suggestionList[i]] = true;
                        }

                    };

                    $scope.keyPressHandler = function (event, item){


                        if (event.key == "Enter") {
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

                        if ($scope.selectMultiple) {

                        }
                        else {
                            $scope.selectedThing.name = item;
                        }

                        // console.log("item", item);
                        // console.log("Selecting a new item");
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
]);
