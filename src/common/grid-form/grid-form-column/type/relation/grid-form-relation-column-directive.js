/*
    Under construction

    Need to add a way to create a new a new entry if a name does not exist.
    Allow the user to select one of a certain type of object.
    Boolean to allow for the creation of new objects.

    column -- bind to


    // Make is to that the top element is highlighted -- can press arrow key to move it down...

    none-selectable

*/

angular.module('gridForm.gridFormColumn.gridFormRelationColumnDirective', [])
    .directive('gridFormRelationColumn', [

        function () {

            return {

                scope: {
                    obj: '=',
                    column: '=',
                    field: '=',
                    allowCreate: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/relation/partials/grid-form-relation-column-directive-tpl.html',

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

                        console.log("selected thing", $scope.obj[$scope.field]);

                        // Take the value of selected


                        // $scope.catalog = {};
                        // $scope.sample = {'catalog': {}};

                        // console.log("Running the init funciton in the grid form single relation column directive.");

                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];

                        // cb resource search ...

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




//Old dropdown directive -- this may be useful because I was building some things in for relations that are no longer going to be used in dropdowns but shoudl be used in releations...
/*


angular.module('gridForm.gridFormColumn.gridFormDropdownColumnDirective', [])
    .directive('gridFormDropdownColumn', [

        function () {

            return {

                scope: {
                    data: '=',
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

                        // Testing stuff
                        // $scope.form.search = "asdf";

                        $scope.textAndStuff = "Here is some text";


                        // If not specified assume that you are selecting a single one
                        $scope.selectMultiple = $scope.maxSelectable ? $scope.selectMultiple != 1 : true; // In the final version this will be passed in with scope.

                        // Properties if selecting single
                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];
                        $scope.highlightedElement = $scope.suggestionList[0];
                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                        // Properties if selecting many
                        $scope.multiSelected = {};
                        $scope.things = ["asdf", "other", "yet another", "and another", "and one more", "don't forget this one"];
                        // $scope.selectedValues = [];

                        $scope.data = $scope.data ? $scope.data : [];

                        // $scope.selectionListString = '';

                        for(var i = 0; i < $scope.suggestionList.length; i++){
                            $scope.multiSelected[$scope.suggestionList[i]] = false;
                        }

                        $scope.focusGained = false; // True if the element has gained focus since the last time the dropdown display was cancelled due to a copy or paste action

                        angular.forEach($scope.data, $scope.selectItem($scope.data));

                    };

                    $scope.keyPressHandler = function (event, item){

                        console.log(event);


                        if ((event.key == "Enter" && event.metaKey == false)) {
                            console.log(event);

                            $scope.selectItem($scope.highlightedElement);

                        }
                        else if(event.key == " ") {

                        // We are not going to make spacebar do anything here since we are going to use it to enter text in other forms of inputs.
                        // $scope.selectItem($scope.highlightedElement);

                            event.preventDefault(); // Don't want it so scoll all the way down.

                        }
                        else if (event.key == "ArrowDown") {

                            console.log("event", event);

                            // Should move onto the next item in the list if there is one
                            console.log("pressed Arrow down");
                            // var index = $scope.suggestionList.find( findFunction(element, index, $scope.highlightedElement) );

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index+1 < $scope.suggestionList.length) {
                                $scope.highlightedElement = $scope.suggestionList[index+1];
                            }

                            // event.stopPropagation();
                            // event.detail.keyboardEvent.preventDefault()

                            event.preventDefault();
                            console.log("should have stopped propagation");

                        }
                        else if (event.key == "ArrowUp") {

                            console.log("pressed Arrow up");

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index - 1 >= 0) {
                                $scope.highlightedElement = $scope.suggestionList[index-1];
                            }

                            event.preventDefault();

                            console.log("should have stopped propagation");
                        }
                        else if (event.key == "Backspace") {

                            console.log("pressed");

                        }
                        else if (event.key == 'a' && event.metaKey == true){


                            console.log(event);

                            console.log("selection start", event.currentTarget.selectionStart);
                            console.log("selection End", event.currentTarget.selectionEnd);


                            var sel = window.getSelection();
                            var el = event.currentTarget;
                            range = document.createRange();
                            range.selectNodeContents(el);
                            sel.removeAllRanges();
                            sel.addRange(range);


                            // event.currentTarget.selectionStart =0;
                            // event.currentTarget.selectionEnd=10;

                            event.preventDefault();
                            // If the user hits ctrl / cmd + a then we want to keep the selection within the currently selected cell.

                        }

                    };

                    $scope.selectItem = function (item) {

                        if ($scope.selectMultiple) {
                            $scope.multiSelected[item] = $scope.multiSelected[item] ? false : true;

                            var tmpList = [];
                            for(var i = 0; i<$scope.suggestionList.length; i++) {
                                if($scope.multiSelected[$scope.suggestionList[i]]){
                                    tmpList.push($scope.suggestionList[i]);
                                }
                            }
                            $scope.selectedValues = tmpList;
                            // $scope.selectionListString = $scope.selectedValues.join(", ");

                        }

                        else {
                            $scope.selectedThing.name = item;
                            $scope.selectedValues = [item];
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


                    init();

                }
            };
        }
]);
*/
