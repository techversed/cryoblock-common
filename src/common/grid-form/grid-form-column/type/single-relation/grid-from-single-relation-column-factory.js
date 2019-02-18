angular.module('gridForm.gridFormColumn.gridFormSingleRelationColumnFactory', [])
    .factory('gridFormSingleRelationColumnFactory', [

        /*
            This factory creates an object which holds all of the information pertaining to single realations

        */

        function () {

            // Boolean to allow for the creation of new elements



            var gridFormSingleRelationColumn = {

                url: "asdf",
                selectedElement: [],
                elementsToShow: [],
                numberOfElementsToFetch: [],
                allowCreation: true

            };


            /*
                function setSelection
                function getItems
                function setItems
                function selectElement

            */

            return gridFormSingleRelationColumn;


        }
]);
