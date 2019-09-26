/*

    Under contruction


    This factory creates an object which holds all of the information pertaining to single realations

    To be added:
        Properties:
            Booleans to allow for the creation of new elements

        Functions:
            function setSelection
            function getItems
            function setItems
            function selectElement

*/

angular.module('gridForm.gridFormColumn.gridFormRelationColumnFactory', [])
    .factory('gridFormRelationColumnFactory', [

        function () {

            var gridFormRelationColumn = {

                url: "asdf",
                selectedElement: [],
                elementsToShow: [],
                numberOfElementsToFetch: [],
                allowCreation: true

            };

            return gridFormRelationColumn;

        }
]);