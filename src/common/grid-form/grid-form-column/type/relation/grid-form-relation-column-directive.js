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
    .directive('gridFormRelationColumn', ['$gridFilterPromiseSharer',

        function ($gridFilterPromiseSharer) {

            return {

                scope: {
                    obj: '=',
                    column: '=',
                    field: '=',
                    allowCreate: '='
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/relation/partials/grid-form-relation-column-directive-tpl.html',

                link: function($scope, element, attrs) {
                        console.log("here");
                        $scope.element = element[0];
                },

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

                        $scope.refreshUrl = $scope.column.url ? $scope.column.url : "/user";
                        $scope.highlightedIndex = 0;
                        $scope.highlightedElement = ""; //$scope.suggestionList[$scope.highlightedIndex];
                        $scope.refreshCount = 0;        // Number of times that updated search results have been requested

                        $scope.searchString = "";
                        $scope.suggestionList = [];
                        $scope.getSearchResults();

                        $scope.selectedThing = {};
                        $scope.selectedThing.name = '';

                    };

                    $scope.createDisplayString = function (thing) {

                        var name = "";

                        if ($scope.column.labelFields) {
                            for(var i =0; i<$scope.column.labelFields.length; i++) {
                                name += i == 0 ? "" : " - ";
                                name += thing[$scope.column.labelFields[i]] ? thing[$scope.column.labelFields[i]] : " ";
                            }
                        }

                        return name;

                    };

                    $scope.getSearchResults = function () {

                        $scope.refreshCount++;
                        var numRefreshes = $scope.refreshCount;

                        var params = {cSearch: $scope.searchString};

                        $gridFilterPromiseSharer.addPromise($scope.refreshUrl, params).then(function (response) {

                            if ($scope.refreshCount == numRefreshes) {

                                $scope.suggestionList = response.data;
                                $scope.highlightedIndex = $scope.highlightedIndex < $scope.suggestionList.length ? $scope.highlightedIndex : 0;// $scope.suggestionList.length-1;
                                $scope.highlightedElement = $scope.suggestionList[$scope.highlightedIndex];

                            }
                        });

                    };

                    $scope.keyPressHandler = function (event, item){

                        if (event.key == "Enter") {

                            $scope.selectItem($scope.highlightedElement);

                        }
                        else if (event.key == "ArrowDown") {

                            event.preventDefault();

                            $scope.highlightedIndex = $scope.highlightedIndex < $scope.suggestionList.length-1 ? $scope.highlightedIndex + 1 : $scope.highlightedIndex;
                            $scope.highlightedElement = $scope.suggestionList.length > 0 ? $scope.suggestionList[$scope.highlightedIndex] : "";

                        }
                        else if (event.key == "ArrowUp") {

                            event.preventDefault();

                            $scope.highlightedIndex = $scope.highlightedIndex > 0 ? $scope.highlightedIndex - 1 : $scope.highlightedIndex;
                            $scope.highlightedElement = $scope.suggestionList.length > 0 ? $scope.suggestionList[$scope.highlightedIndex] : "";

                        }
                        else {

                            $scope.getSearchResults();

                        }
                    };

                    $scope.shiftFocus = function () {

                        $scope.focusGained = true;

                        $scope.element.getElementsByClassName("gridFormRelationSearch")[0].focus();

                        // document.getElementById("testing").focus();
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
