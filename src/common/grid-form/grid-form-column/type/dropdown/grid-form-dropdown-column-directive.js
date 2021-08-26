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
                            if (haystack[i] == needle) return i;
                        }

                        return -1;

                    }

                    var initArray = function (value, count) {

                        var tmp = [];

                        for (i=0; i<count;i++) {
                            tmp.push(value);
                        }

                        return tmp;

                    }

                    var init = function () {

                        $scope.minSelectable
                        $scope.obj[$scope.field] = $scope.obj[$scope.field] ? $scope.obj[$scope.field] : [];
                        $scope.selectMultiple = $scope.column.maxSelectable ? false : ($scope.column.maxSelectable == 1)  ? true : true;
                        $scope.suggestionList = $scope.column.acceptedValues;
                        $scope.highlightedElement = $scope.suggestionList[0];

                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                        $scope.multiSelected = {};

                        for (var i = 0; i < $scope.suggestionList.length; i++) {
                            $scope.multiSelected[$scope.suggestionList[i]] = false;
                        }

                        $scope.selectItem($scope.obj[$scope.field]);

                        $scope.focusGained = false;

                    };

                    $scope.keyPressHandler = function (event, item) {


                        if (event.key == "Enter") {

                            $scope.selectItem($scope.highlightedElement);

                        }

                        else if (event.key == "ArrowDown") {

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index+1 < $scope.suggestionList.length) {
                                $scope.highlightedElement = $scope.suggestionList[index+1];
                            }

                            event.preventDefault();

                        }

                        else if (event.key == "ArrowUp") {

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index - 1 >= 0) {
                                $scope.highlightedElement = $scope.suggestionList[index-1];
                            }

                            event.preventDefault();

                        }

                        // Don't move down the page when space is pressed
                        else if (event.key == " ") {

                            event.preventDefault();

                        }

                        else if (event.key == "Backspace") {

                            console.log("May not even need anything to handle backspace");

                        }

                        else if (event.key == 'a' && event.metaKey == true) {

                            var sel = window.getSelection();
                            var el = event.currentTarget;
                            range = document.createRange();
                            range.selectNodeContents(el);
                            sel.removeAllRanges();
                            sel.addRange(range);

                            event.preventDefault();

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

                        }

                        else {

                            if ($scope.obj[$scope.field].includes(item)) {
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

                        $scope.focusGained = true;
                        // console.log("shifting focus is not implemented yet I don't think");

                    };

                    $scope.catchPaste = function (event) {

                        var tmp = event.originalEvent.clipboardData.getData('text').trim().split(', ');

                        $scope.focusGained = false;

                    };

                    $scope.catchCopy = function (event) {

                        $scope.focusGained = false; // If they copy, close the

                    };

                    $scope.catchCut = function (event) {

                        $scope.focusGained = false; // If they copy, close the

                    };

                    $scope.unselectItem = function (thing) {

                        $scope.selectItem(thing);

                    };


                    init();

                }
            };
        }
]);
