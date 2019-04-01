/*
    Column factory for relations that allow for the selection of multiple elements.
    This version will now allow for the creation of new elements because that just gets too complicated.


    To be added:
        Properties:
            minrequired = The form is invalid if fiewer than this number of elements are selected from the list.
            maxrequired = The form is invalid if more than this number of elements are selected

*/

angular.module('gridForm.gridFormColumn.gridFormMultiRelationColumnFactory', [])
    .factory('gridFormMultiRelationColumnFactory', [

        function () {

            var gridFormMultiRelationColumn = {

                url: "asdf",


            };

            return gridFormMultiRelationColumn;

        }
]);
