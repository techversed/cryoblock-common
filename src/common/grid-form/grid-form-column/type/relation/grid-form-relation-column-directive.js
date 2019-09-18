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


                        $scope.searchString = "";
                        // $scope.ballz = 'asdf';

                        console.log("selected thing", $scope.obj[$scope.field]);

                        //
                        $scope.suggestionList = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'asdf5'];

                        $scope.highlightedElement = $scope.suggestionList[0];
                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                    };

                    $scope.keyPressHandler = function (event, item){

                        console.log("object:", $scope.obj);

                        console.log("key:", event.key);

                        console.log("column:", $scope.column);

                        console.log("asdf");


                        if (event.key == "Enter") {

                            console.log(event);
                            $scope.selectItem($scope.highlightedElement);
                        }

                        else if (event.key == "ArrowDown") {

                            console.log("pressed Arrow down");

                            event.preventDefault();

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index+1 < $scope.suggestionList.length) {
                                $scope.highlightedElement = $scope.suggestionList[index+1];
                            }

                        }
                        else if (event.key == "ArrowUp") {

                            console.log("pressed Arrow up");

                            event.preventDefault();

                            var index = getIndex($scope.highlightedElement, $scope.suggestionList);

                            if (index - 1 >= 0) {
                                $scope.highlightedElement = $scope.suggestionList[index-1];
                            }

                            console.log($scope.highlightedElement);

                        }

                        else if (event.key == "Backspace") {

                            $scope.searchString.pop();

                            console.log("pressed");

                        }
                    };

                    $scope.shiftFocus = function () {

                        console.log("This should now shift the focus to the search bar located within this directive");

                        $scope.focusGained = true;

                        // document.getElementById("testing").focus();
                        document.getElementsByClassName("testing")[1].focus();
                        // I don't know whether or not we are even going to end up doing the whole searchbar thing for this afterall -- still to be determined...

                    };

                    $scope.selectItem = function (item) {

                        $scope.selectedThing.name = item;

                    };

                    $scope.stopClickPropagation = function (actionevent) {
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
