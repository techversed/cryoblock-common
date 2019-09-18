/*

    Gridform Dropdown Column
    Written by Taylor Jones

    This column type is used when there is a finite list of possible inputs for a given field.
    Unlike the relations this dropdown does not have any communication with the backend.
    Searching will be performed within the interface

*/

angular.module('gridForm.gridFormColumn.gridFormDropdownColumnDirective', [])
    .directive('gridFormDropdownColumn', [

        function () {

            return {

                scope: {
                    obj: '=',
                    column: '=',
                    field: '=',
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/dropdown/partials/grid-form-dropdown-column-directive-tpl.html',

                controller: function ($scope) {

                    // Needle is what you are searching for -- I adopted this convention from the needle haystack
                    // Index is the
                    var getIndex = function (needle, haystack) {

                        for (i=0; i < haystack.length; i++) {
                            if (haystack[i]==needle) return i;
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

                        $scope.minSelectable

                        $scope.obj[$scope.field] = $scope.obj[$scope.field] ? $scope.obj[$scope.field] : [];

                        $scope.selectMultiple = $scope.column.maxSelectable ? false : ($scope.column.maxSelectable == 1)  ? true : true;


                        // In the end this is going to end up querying the backend.
                        // console.log("column", $scope.column);
                        // $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];
                        // console.log("obj", $scope.obj);

                        $scope.suggestionList = $scope.column.acceptedValues;

                        $scope.highlightedElement = $scope.suggestionList[0];

                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                        $scope.multiSelected = {};

                        for(var i = 0; i < $scope.suggestionList.length; i++){
                            $scope.multiSelected[$scope.suggestionList[i]] = false;
                        }

                        $scope.selectItem($scope.obj[$scope.field]);

                        $scope.focusGained = false;

                    };

                    $scope.keyPressHandler = function (event, item) {

                        // console.log(event);

                        if (event.key == "Enter") {
                            // console.log(event);

                            $scope.selectItem($scope.highlightedElement);

                        }

                        else if (event.key == "ArrowDown") {

                            // console.log("event", event);

                            // Should move onto the next item in the list if there is one
                            // console.log("pressed Arrow down");
                            // var index = $scope.suggestionList.find( findFunction(element, index, $scope.highlightedElement) );

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index+1 < $scope.suggestionList.length) {
                                $scope.highlightedElement = $scope.suggestionList[index+1];
                            }

                            // event.stopPropagation();
                            // event.detail.keyboardEvent.preventDefault()

                            event.preventDefault();
                            // console.log("should have stopped propagation");

                        }

                        else if (event.key == "ArrowUp") {

                            // console.log("pressed Arrow up");

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index - 1 >= 0) {
                                $scope.highlightedElement = $scope.suggestionList[index-1];
                            }

                            event.preventDefault();

                            // console.log("should have stopped propagation");
                        }

                        // Don't move down the page when space is pressed
                        else if (event.key == " ") {

                            // console.log("pressed space");
                            event.preventDefault();

                        }

                        else if (event.key == "Backspace") {

                            // console.log("pressed");

                        }

                        else if (event.key == 'a' && event.metaKey == true) {

                            console.log(event);
                            console.log("selection start", event.currentTarget.selectionStart);
                            console.log("selection End", event.currentTarget.selectionEnd);

                            var sel = window.getSelection();
                            var el = event.currentTarget;
                            range = document.createRange();
                            range.selectNodeContents(el);
                            sel.removeAllRanges();
                            sel.addRange(range);

                            // event.currentTarget.selectionStart = 0;
                            // event.currentTarget.selectionEnd = 10;

                            event.preventDefault();
                            // If the user hits ctrl / cmd + a then we want to keep the selection within the currently selected cell.

                        }

                    };

                    $scope.selectItem = function (item) {

                        $scope.highlightedElement = item;
                        document.getElementById("testing").focus();

                        if ($scope.selectMultiple) {
                            $scope.multiSelected[item] = $scope.multiSelected[item] ? false : true;

                            var tmpList = [];
                            for(var i = 0; i<$scope.suggestionList.length; i++) {
                                if($scope.multiSelected[$scope.suggestionList[i]]){
                                    tmpList.push($scope.suggestionList[i]);
                                }
                            }
                            $scope.obj[$scope.field] = tmpList;
                            // $scope.selectionListString = $scope.selectedValues.join(", ");

                        }

                        else {

                            if ($scope.obj[$scope.field].includes(item))
                            {
                                $scope.obj[$scope.field] = [];
                            }
                            else {
                                $scope.obj[$scope.field] = [item];
                            }

                        }


                    };

                    $scope.stopClickPropagation = function (actionevent) {

                        actionevent.stopPropagation();

                    };

                    $scope.shiftFocus = function () {

                        console.log("This should now shift the focus to the search bar located within this directive");

                        $scope.focusGained = true;

                        // document.getElementById("testing").focus();
                        // I don't know whether or not we are even going to end up doing the whole searchbar thing for this afterall -- still to be determined...

                    };

                    $scope.catchPaste = function (event) {


                        console.log(event);
                        console.log(event.originalEvent.clipboardData.getData('text'));

                        var tmp = event.originalEvent.clipboardData.getData('text').trim().split(', ');

                        console.log("tmp", tmp);

                        $scope.focusGained = false;

                    };

                    $scope.catchCopy = function (event) {
                        console.log("caught the copy event");

                        $scope.focusGained = false; // If they copy, close the
                    };

                    $scope.catchCut = function (event) {
                        console.log("caught the copy event");

                        $scope.focusGained = false; // If they copy, close the
                    };

                    $scope.unselectItem = function (thing) {

                        $scope.selectItem(thing);
                        console.log(thing);

                    };


                    init();

                }
            };
        }
]);
