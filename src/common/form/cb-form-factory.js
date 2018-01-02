angular.module('form.cbFormFactory', [])

    .factory('$cbForm', ['$http', 'API', '$cbResource', '$q', 'toastr', '$localStorage', '$state', '$stateParams',

        function ($http, API, $cbResource, $q, toastr, $localStorage, $state, $stateParams) {

            var CBForm = function () {

                /**
                 * Form object type
                 *
                 * @type {String || null}
                 */
                this.type = null;

                /**
                 * The object bound to the form
                 *
                 * @type {Object || null}
                 */
                this.object = null;

                /**
                 * The object class
                 *
                 * @type {String || null}
                 */
                this.objectClass = null;

                /**
                 * POST/PUT URL
                 *
                 * @type {String || null}
                 */
                this.url = null;

                /**
                 * Is the form object currently saving
                 *
                 * @type {Boolean}
                 */
                this.isSaving = false;

                /**
                 * Are form attachments currently uploading
                 * @type {Boolean}
                 */
                this.isUploading = false;

                /**
                 * Attachment files added to the form
                 *
                 * @type {Array}
                 */
                this.files = [];

                /**
                 * Upload element
                 *
                 * @type {Element || null}
                 */
                this.uploadElement = null;

                /**
                 * Form errors
                 *
                 * @type {Array}
                 */
                this.errors = [];

            };

            CBForm.prototype = {

                /**
                 * Set the form object type
                 *
                 * @param {String} type
                 */
                setType: function (type) {

                    this.type = type;

                    return this;

                },

                /**
                 * Set the object
                 *
                 * @param {Object} object
                 */
                setObject: function (object) {

                    this.object = object;

                    return this;

                },

                /**
                 * Set the object entity class
                 *
                 * @param {String} objectClass
                 */
                setObjectClass: function (objectClass) {

                    this.objectClass = objectClass;

                    return this;

                },

                /**
                 * Set the POST/PUT URL
                 *
                 * @param {String} url
                 */
                setUrl: function (url) {

                    this.url = url;

                    return this;

                },

                /**
                 * Set the upload element
                 *
                 * @param {Element} el
                 */
                setUploadElement: function (el) {

                    this.uploadElement = el;

                    return this;

                },

                /**
                 * Check if file attachment is an image
                 *
                 * @param  {File}  file
                 * @return {Boolean}
                 */
                isImage: function (file) {

                    switch (file.type) {
                        case "image/jpeg":
                            return true;
                        case "image/png":
                            return true;
                        default:
                            return false;
                    }

                },

                /**
                 * Close the form modal
                 *
                 * @param  {Form} form
                 * @param  {Scope} scope the controller scope
                 */
                close: function (form, scope) {

                    if (this.isSaving || this.isUploading) {
                        return;
                    }

                    if (form.$pristine === false) {

                        swal({
                            title: "Are you sure?",
                            text: "You have unsaved changes that will be lost.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true
                        }, function() {
                            scope.$close();
                        });

                        return;

                    }

                    scope.$close();

                },

                /**
                 * Add file attachments
                 *
                 * @param {[File]} files
                 * @param {Scope} scope
                 */
                addFiles: function (files, scope) {

                    var that = this;
                    for (var i = 0; i < files.length; i++) {

                        var file = files[i], reader = new FileReader();

                        file.loaded = 0;

                        reader.onprogress = (function(file) {

                            return function(e) {

                                file.isLoading = true;
                                scope.$apply();

                            };

                        })(file);

                        reader.onload = (function(file) {

                            return function(e) {

                                file.isLoading = false;

                                if (that.isImage(file)) {
                                    file.src = e.target.result;
                                    file.isImage = true;
                                }

                                scope.$apply();

                            };

                        })(file);

                        // Read in the image file as a data URL.
                        reader.readAsDataURL(file)

                        this.files.push(file);

                    }

                    return this;

                },

                removeFile: function (file) {
                    this.files.splice(this.files.indexOf(file), 1);
                },

                /**
                 * Save the form
                 *
                 * @param  {Form} form
                 * @param  {Scope} scope the controller scope
                 *
                 * @return {Promise}
                 */
                save: function (form, scope) {

                    /** prevent any chance of double saving */
                    if (this.isSaving || this.isUploading) {
                        return;
                    }

                    form.$submitted = true;

                    /** have to call this so relationship form directives do what they need to do */
                    scope.$broadcast('form:submit');

                    if (!form.$valid) {
                        return;
                    }

                    var that = this;
                    return this.saveObject().then(

                        function (response) {

                            if (that.object.id == undefined) {
                                that.object.id = response.data.id;
                            }

                            return that.uploadAttachments(scope).then(

                                function () {
                                    var method = that.object.id !== undefined ? 'update' : 'create';
                                    toastr.info(that.type + ' ' + method + 'd successfully');
                                    scope.$close();
                                    $state.go($state.current, $stateParams, {reload:true});
                                },

                                function () {

                                    deferred.reject({success:true});

                                }
                            );

                        },

                        function () {

                            deferred.reject({success:true});

                        }

                    );

                },

                /**
                 * Save the form object
                 *
                 * @return {Promise}
                 */
                saveObject: function () {

                    var method = this.object.id !== undefined ? 'update' : 'create';
                    var url = method === 'update'
                        ? this.url + '?id[EQ]=' + this.object.id
                        : this.url
                    ;

                    this.isSaving = true;

                    var that = this;
                    return $cbResource[method](url, this.object).then(

                        function (response) {

                            that.isSaving = false;

                            return response;

                        },

                        function (response) {

                            that.errors = response.data;
                            that.isSaving = false;

                            return response;

                        }

                    );

                },

                /**
                 * Upload object attachments
                 *
                 * @param  {Scope} scope the controller scope
                 *
                 * @return {Promise}
                 */
                uploadAttachments: function (scope) {

                    var deferred = $q.defer();
                    var completedCount = 0;

                    if (this.files.length) {
                        this.isUploading = true;
                    }

                    for (var fileIndex = 0; fileIndex < this.files.length; fileIndex++) {

                        var file = this.files[fileIndex];

                        this.uploadElement.fileupload();

                        var that = this;

                        var options = {
                            files: [file],
                            url: API.url + '/_uploader/cryoblock/upload?object_id=' + this.object.id + '&object_class=' + this.objectClass,
                            headers: {},
                            maxChunkSize: 10000000,
                            singleFileUploads: false,
                            progress: function (e, data) {
                                angular.forEach(that.files, function (file) {
                                    if (file.name == data.files[0].name) {
                                        file.loaded = parseInt((data.loaded / file.size) * 100);
                                    }
                                });
                                scope.$apply();
                            }

                        };

                        options.headers[API.apiKeyParam] = $localStorage.User.apiKey;

                        this.uploadElement.fileupload('option', options);

                        this.uploadElement.fileupload('send', options)
                            .complete(function () {

                                completedCount++;

                                if (completedCount == that.files.length) {
                                    deferred.resolve({success:true});
                                }

                            })
                        ;

                    }

                    if (this.files.length == 0) {
                        deferred.resolve({success:true});
                    }


                    return deferred.promise;

                }


            };

            /**
             * Create a new instance of CBForm
             *
             * @return {CbForm}
             */
            CBForm.create = function () {

                return new CBForm();

            };

            return CBForm;
        }

    ])
;
