/*
    This factory creates all of the fields which will be handled in the grid form directive.
    Use of the factory allows for us to create a new class similar to cbGridBuilder or cbResource which abstracts away the details and makes this directive usable within your average controller.


*/

angular.module('gridForm.gridFormFactory', [])
    .factory('gridFormFactory', [
        function () {

            /*

                The purpose of this class is to make it so that objects can be created or updated in a bulk fashion -- this is going to serve as an alternative to the excel download and upload at some point although both will still be supported.
                    This change makes sense due to the fact that a large number of people are frustraded with having to constantly download and reupload excel sheets -- this should make things move more quickly and should also let us support bulk completion of requests.

            */

            var GridForm = function () {

                // Valid input types
                    // text -- freetext
                    // dropdown -- enumerated type
                    // sinelerelation -- linked to things on the backend
                    // multirelation -- Dropdown list

                // For everything type, validators, sorting operator, sortable.

                // I don't know if we want to use fieldname or bindTo as the name of the field that we want to grab.

                // Default

                this.columns = [
                    {id: "id", header: "Text", field: "Field1", default: "default value for that column when a new object is created", required: true, fieldName: "asdf", type: "text", validators: ["list of functions"], sortingOperator: function () {}, sortable:true},
                    {id: "id", header: "Dropdown", field: "Field2", required: true, fieldName: "asdf", type: "dropdown", validInputs: ["list", "of", "possible", "inputs"], validators: ["List of functions"]},
                    {id: "id", header: "Single-Relation", field: "Field3", required: true, fieldName: "asdf", type: "singlerelation", backendUrl: 'path to url', validators: ["list of functions"]},
                    {id: "id", header: "Multi-Relation", field: "Field4", required: true, fieldName: "asdf", type: "multirelation", minrequired: "Min number of linked objects for it to be valid", maxrequired: "Max number of linked objects for it to be a valid input", backendUrl: 'path to url', validators: ["List of functions"]},
                    {id: "id", header: "Boolean", field: "Field5", required: true, fieldName: "asdf", type: "boolean", backendUrl: 'path to url', validators: ["List of functions"]},
                ];

                this.rows = [
                    {id: 0, collapsed: false, deleted: false, entity: {'Field1': 'asdf0', 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 1, collapsed: false, deleted: false, entity: {'Field1': 'asdf1', 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 2, collapsed: false, deleted: false, entity: {'Field1': 'asdf2', 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 3, collapsed: false, deleted: false, entity: {'Field1': 'asdf3', 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 4, collapsed: false, deleted: false, entity: {'Field1': 'asdf4', 'Field2': 2, 'Field3': 3, 'Field4': 4}}
                ];

                // Want to make it possible to group rows in the best way possible. -- could set it up to group by sample id for instance.
                this.rowOrdering = [0,1,2,3,4];

            };

            GridForm.prototype = {

                getColumns: function () {
                    return this.columnns;
                },

                setColumns: function (columns) {
                    this.columns = columns;
                },

                // Copies an existing object and creates a row for it in this table
                addRowFromObject: function(ent){
                    this.rows.push({id: this.rows.length, collapsed: false, deleted: false, entity: ent});
                },

                // Takes a list of objects and adds a row for each one -- might be a good idea to copy them bofore adding them so that you don't change the initial object
                addRowsFromObjects: function (ents) {
                    // angular.foreach(ents, this.addRowFromOjbect(thing)
                },

                // Add an element to the gridform
                addEmptyRow: function () {
                    // For each column set default value for that field.
                },

                // We will implement this sutf later.
                // This should take a template and a controller and make it so that the given row actions were all possible on the current gridform.
                addRowActions: function (templatePath, controller) {
                    // asdf
                },

                // Create a list of updates and a list of creations -- send to backend
                collectUpdates: function () {
                    // Collect updates, creations, deletions
                },

                // Remove an element from the grid form
                removeRow: function () {

                }

            }

            GridForm.create = function () {

                return new GridForm();

            };

            return GridForm;

        }

    ])
;

