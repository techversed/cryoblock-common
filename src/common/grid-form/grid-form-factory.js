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


                // Default for new ros

                // Valid input types
                    // text -- freetext
                    // dropdown -- enumerated type
                    // sinelerelation -- linked to things on the backend
                    // multirelation -- Dropdown list

                // For everything type, validators, sorting operator, sortable.

                // I don't know if we want to use fieldname or bindTo as the name of the field that we want to grab.

                // Default

                // The word default seems to be a reserved word in javascript -- used the word defVal instead.
                // Column definitions


                // we are going to remove singlerelation and multirelation and just have a single one called relation which has minselected and maxselected properties.

                // We are going to move towards setting this through the url instead

                this.rows = [];
                this.columns = [];
                this.rowOrdering = [];
                this.submissionUrl = null;
                this.validationUrl = null;
                this.addCreateNew = true;

            };

            GridForm.prototype = {


                getColumns: function () {

                    return this.columnns;

                },

                setColumns: function (columns) {

                    this.columns = columns;
                    return this;

                },

                /*

                    Takes a boolean value -- sets whether or not the user is able to create new elements in this form

                */
                setAddCreateNew: function (addCreateNew){

                    this.addCreateNew = addCreateNew;

                    return this;

                },

                clearRows: function () {

                    this.rows = [];
                    this.rowOrdering = [];

                    return this;

                },

                // Copies an existing object and creates a row for it in this table
                addRowFromObject: function(ent){

                    this.rowOrdering.push(this.rows.length);
                    this.rows.push({id: this.rows.length, collapsed: false, deleted: false, entity: ent});

                    return this;

                },

                // Takes a list of objects and adds a row for each one -- might be a good idea to copy them bofore adding them so that you don't change the initial object
                addRowsFromObjects: function (ents) {

                    var that = this;

                    angular.forEach(ents, function(ent){

                        that.addRowFromObject(ent);

                    });

                    return this;

                },

                // Add an element to the gridform
                addEmptyRow: function () {

                    // For each column set default value for that field.
                    // Set to empty
                    // {id: 4, collapsed: false, deleted: false, entity: {'Field1': 'asdf4', 'Field2': [], 'Field3': [], 'Field4': []}}

                    var emptyRow = {};
                    angular.forEach(this.columns, function(thing){
                        if (thing['type'] == 'relation') {
                            emptyRow[thing['field']] = [];
                        }
                        else if(thing['type'] == 'text') {

                        }
                        else if(thing['type'] == 'dropdown'){
                            emptyRow[thing['field']] = [];
                        }
                    });

                    this.addRowFromObject(emptyRow);

                },

                validate: function() {

                    console.log("Run the validation stuff -- to be written on the backend");

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
                removeRow: function (row) {
                    // asdf
                },


                refresh: function () {
                    // asdf
                }


            }

            GridForm.create = function () {

                return new GridForm();

            };

            return GridForm;

        }

    ])
;


