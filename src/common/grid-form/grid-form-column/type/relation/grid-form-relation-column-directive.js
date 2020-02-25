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
                    allowCreate: '=',
                    multiple: '@'
                },

                restrict: 'E',

                templateUrl: 'common/grid-form/grid-form-column/type/relation/partials/grid-form-relation-column-directive-tpl.html',

                link: function($scope, element, attrs) {

                        $scope.element = element[0];

                },

                controller: function ($scope) {

                    // Needle is what you are searching for -- I adopted this convention from the needle haystack
                    // Index is the

                    var getIndex = function (needle, haystack) {

                        for (i=0; i<haystack.length; i++) {

                            if(haystack[i]==needle) return i;

                        }

                        return -1;

                    }

                    var init = function () {

                        $scope.refreshUrl = $scope.column.url ? $scope.column.url : "/user";
                        $scope.highlightedIndex = 0;
                        $scope.highlightedElement = "";
                        $scope.refreshCount = 0;

                        $scope.searchString = "";
                        $scope.suggestionList = [];
                        $scope.getSearchResults();

                        $scope.multiple = $scope.multiple ?  $scope.multiple : "false";

                    };

                    $scope.unselectItem = function(item){

                        $scope.obj[$scope.field] = $scope.obj[$scope.field].filter(word => word != item);

                    };

                    $scope.createDisplayString = function (thing) {

                        var name = "";

                        if ($scope.column.labelFields) {
                            for (var i =0; i<$scope.column.labelFields.length; i++) {
                                name += i == 0 ? "" : " - ";

                                try {
                                    name +=  eval("thing." + $scope.column.labelFields[i])
                                }
                                catch (e) {

                                }
                            }
                        }

                        return name;

                    };

                    $scope.errorLog = function(){

                        console.log("here is all of the shit");

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

                    // $scope.onSearchChange = function (event,

                    $scope.keyPressHandler = function (event, item){

                        if (event.key == "Enter") {

                            $scope.selectItem($scope.highlightedElement);
                            event.preventDefault();

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
                    };

                    $scope.shiftFocus = function () {

                        $scope.focusGained = true;

                        $scope.element.getElementsByClassName("gridFormRelationSearch")[0].focus();

                    };

                    $scope.selectItem = function (item) {

                        if ($scope.multiple == "false") {

                            if (!$scope.obj[$scope.field].includes(item)) {

                                $scope.obj[$scope.field] = [item];

                            }
                            else
                            {
                                $scope.unselectItem(item);
                            }

                        }
                        else
                        {
                            if($scope.obj[$scope.field]){
                                if (!$scope.obj[$scope.field].includes(item)) {
                                    $scope.obj[$scope.field].push(item);
                                }
                                else {
                                    $scope.unselectItem(item)
                                }

                            }
                            else{
                                $scope.obj[$scope.field] = [item];
                            }
                        }

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
