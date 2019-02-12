angular.module('gridForm.gridFormFactory', [])

    .factory('gridFormFactory', ['gridFormColumnFactory', 'gridFilterFactory', '$location',

        function (gridColumnFactory, gridFilterFactory, $location) {

            /*

                In the end this is not goint to contain gridColumnFactory...

            */

            var GridForm = function () {

                // Valid input types
                    // text -- freetext
                    // enum -- dropdown
                    // sinelerelation -- linked to things on the backend
                    // multirelation -- Dropdown list


                // For everything type, validators, sorting operator, sortable

                // I don't know if we want to use fieldname or bindTo as the name of the field that we want to grab.
                // Default

                this.columns = [
                    {id: "id", header: "Thing1", field: "Field1", default: "default value for that column when a new object is created", required: true, fieldName: "asdf", type: "text", validators: ["list of functions"], sortingOperator: function () {}, sortable:true},
                    {id: "id", header: "Thing2", field: "Field2", required: true, fieldName: "asdf", type: "enum", validInputs: ["list", "of", "possible", "inputs"], validators: ["List of functions"]},
                    {id: "id", header: "Thing3", field: "Field3", required: true, fieldName: "asdf", type: "singlerelation", backendUrl: 'path to url', validators: ["list of functions"]},
                    {id: "id", header: "Thing4", field: "Field4", required: true, fieldName: "asdf", type: "multirelation", minrequired: "Min number of linked objects for it to be valid", maxrequired: "Max number of linked objects for it to be a valid input", backendUrl: 'path to url', validators: ["List of functions"]},
                ];

                this.rows = [
                    {id: 0, collapsed: false, deleted: false, entity: {'Field1': 1, 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 1, collapsed: false, deleted: false, entity: {'Field1': 1, 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 2, collapsed: false, deleted: false, entity: {'Field1': 1, 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 3, collapsed: false, deleted: false, entity: {'Field1': 1, 'Field2': 2, 'Field3': 3, 'Field4': 4}},
                    {id: 4, collapsed: false, deleted: false, entity: {'Field1': 1, 'Field2': 2, 'Field3': 3, 'Field4': 4}}
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


