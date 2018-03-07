angular.module('productionPipeline.productionPipelineFactory', [])

    .factory('productionPipelineFactory', ['productionPipelineStepFactory', 'StepsService', '$cbResource', 'API', '$localStorage', 'sampleGridFactory', 'sampleImportManager', 'toastr', '$state',

        function (productionPipelineStepFactory, StepsService, $cbResource, API, $localStorage, sampleGridFactory, sampleImportManager, toastr, $state) {

            var ProductionPipelineFactory = function () {

                this.scope = null;

                this.name = null;

                this.steps = [];

                this.currentStep = null;

                this.entity = null;

                this.requestObject = null;

                this.totalOutputSamples = 0;

                this.catalogData = null;

                this.inputTemplateLoaded = false;

                this.outputTemplateLoaded = false;

                this.inputFileInput = null;

                this.outputFileInput = null;

                this.isUploading = false;

                this.inputSampleType = null;

                this.outputSampleType = null;

                this.inputErrorCount = 0;

                this.outputErrorCount = 0;

                this.importData = null;

                this.outputData = null;

                this.inputImportGrid = null;

                this.outputImportGrid = null;

                this.outputStorageGrid = null;

                this.resetInputFileInput();

                this.resetOutputFileInput();

                this.resultSampleIds = null;

                this.inputTemplateType = null;

                this.outputSampleDefaults = null;

                this.completeUrl = '/production/complete';

                this.returnState = 'profile.index';

            };

            ProductionPipelineFactory.prototype = {

                setScope: function (scope) {

                    this.scope = scope;

                    this.scope.$on('$destroy', function () {
                        if (this.inputFileInput) {
                            this.inputFileInput.remove();
                        }
                        if (this.outputFileInput) {
                            this.outputFileInput.remove();
                        }
                    });

                    return this;

                },

                addStep: function (step) {

                    this.steps.push(step);

                    return this;

                },

                setName: function (name) {

                    this.name = name;

                    return this;

                },

                setCurrentStep: function (currentStep) {

                    this.currentStep = currentStep;

                    return this;

                },

                setEntity: function (entity) {

                    this.entity = entity;

                    return this;

                },

                setCompleteUrl: function (completeUrl) {

                    this.completeUrl = completeUrl;

                    return this;

                },

                setCatalogData: function (catalogData) {

                    this.catalogData = catalogData;

                    return this;

                },

                setRequestObject: function (requestObject) {

                    this.requestObject = requestObject;

                    return this;

                },

                setInputSampleType: function (inputSampleType) {

                    this.inputSampleType = inputSampleType;

                    return this;

                },

                setOutputSampleType: function (outputSampleType) {

                    this.outputSampleType = outputSampleType;

                    return this;

                },

                setOutputSampleDefaults: function (outputSampleDefaults) {

                    this.outputSampleDefaults = outputSampleDefaults;

                    return this;

                },

                setReturnState: function (returnState) {

                    this.returnState = returnState;

                    return this;
                },

                s2ab: function (s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                },

                cancel: function () {

                    var that = this;
                    swal({
                        title: "Are you sure?",
                        text: "Going back will result in losing your current progress.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    }, function() {
                        $state.go(that.returnState, {id: that.requestObject.id});
                    });

                },

                onSelectInputTemplateType: function (inputTemplateType, data) {
                    this.downloadInputTemplate();
                },

                downloadInputTemplate: function () {

                    var that = this;

                    var data = {
                        entity: this.entity,
                        id: this.requestObject.id,
                        inputTemplateType: this.inputTemplateType
                    };

                    if (this.inputTemplateType === 'CSV') {

                        $cbResource.create('/production/download-input-template', data).then(function (response) {

                            var blob = new Blob([response.data], {type:'application/csv'});

                            var windowUrl = window.URL || window.webkitURL;
                            var url = windowUrl.createObjectURL(blob);

                            var filename = that.requestObject.alias + ' Input Samples Template.csv';

                            var a = document.createElement('a');

                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);

                        });

                    }

                    if (this.inputTemplateType === 'EXCEL') {

                        var xhr = new XMLHttpRequest();

                        xhr.open('POST', API.url + '/production/download-input-template' , true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.setRequestHeader('X_FILENAME', that.requestObject.alias + ' Input Samples Template.xlsx');
                        xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                        xhr.responseType = 'blob';

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {

                                    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                    var blob = new Blob([xhr.response], { type: contentType });

                                    var windowUrl = window.URL || window.webkitURL;
                                    var url = windowUrl.createObjectURL(blob);
                                    var filename = that.requestObject.alias + ' Input Samples Template.xlsx';
                                    var a = document.createElement('a');

                                    a.href = url;
                                    a.download = filename;
                                    a.click();
                                    window.URL.revokeObjectURL(url);

                                } else {
                                    // observer.error(xhr.response);
                                }
                            }
                        };

                        xhr.send(JSON.stringify(data));

                    }


                },

                downloadOutputTemplate: function () {

                    var that = this;

                    var data = {
                        entity: this.entity,
                        id: this.requestObject.id,
                        totalOutputSamples: that.totalOutputSamples,
                        sampleType: this.outputSampleType.name,
                        catalog: this.catalogData.catalogName,
                        outputTemplateType: this.outputTemplateType,
                        outputSampleDefaults: this.outputSampleDefaults
                    };

                    if (this.outputTemplateType === 'CSV') {

                        $cbResource.create('/production/download-output-template', data).then(function (response) {

                            var blob = new Blob([response.data], {type:'application/csv'});

                            var windowUrl = window.URL || window.webkitURL;
                            var url = windowUrl.createObjectURL(blob);

                            var filename = that.requestObject.alias + ' Output Samples Template.csv';

                            var a = document.createElement('a');

                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);

                        });

                    }

                    if (this.outputTemplateType === 'EXCEL') {

                        var xhr = new XMLHttpRequest();

                        xhr.open('POST', API.url + '/production/download-output-template' , true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.setRequestHeader('X_FILENAME', that.requestObject.alias + ' Output Samples Template.xlsx');
                        xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                        xhr.responseType = 'blob';

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {

                                    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                    var blob = new Blob([xhr.response], { type: contentType });

                                    var windowUrl = window.URL || window.webkitURL;
                                    var url = windowUrl.createObjectURL(blob);
                                    var filename = that.requestObject.alias + ' Output Samples Template.xlsx';
                                    var a = document.createElement('a');

                                    a.href = url;
                                    a.download = filename;
                                    a.click();
                                    window.URL.revokeObjectURL(url);

                                } else {
                                    // observer.error(xhr.response);
                                }
                            }
                        };

                        xhr.send(JSON.stringify(data));

                    }


                },

                uploadInputTemplate: function () {
                    this.inputFileInput.click();
                },

                uploadOutputTemplate: function () {
                    this.outputFileInput.click();
                },

                resetInputFileInput: function () {
                    if (this.inputFileInput) {
                        this.inputFileInput.remove();
                    }

                    this.inputFileInput = angular.element('<input style="display:none" type="file" id="input-file-uploader"></input>');

                    angular.element(document).find('body').append(this.inputFileInput);

                    var that = this;
                    this.inputFileInput.on('change', function () {
                        that.handleInputUpload();
                    });

                },

                resetOutputFileInput: function () {

                    if (this.outputFileInput) {
                        this.outputFileInput.remove();
                    }

                    this.outputFileInput = angular.element('<input style="display:none" type="file" id="output-file-uploader"></input>');

                    angular.element(document).find('body').append(this.outputFileInput);

                    var that = this;
                    this.outputFileInput.on('change', function () {
                        that.handleOutputUpload();
                    });

                },

                handleInputUpload: function () {

                    this.isUploading = true;

                    this.scope.$apply();

                    var file = angular.element('#input-file-uploader')[0].files[0];

                    if (file == undefined) {
                        toastr.error('Sorry, an error occured while uploading your file, please review the CSV and try again.')
                        this.isUploading = false;
                        this.resetInputFileInput();
                        return;
                    }

                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', API.url + '/storage/sample-update/' + this.inputSampleType.id, true);

                    this.inputErrorCount = 0

                    var that = this;
                    xhr.onreadystatechange = function () {

                        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {

                            that.importData = JSON.parse(xhr.responseText)

                            that.inputImportGrid = sampleGridFactory.getImportGrid(that.importData);

                            that.scope.$apply();

                            that.isUploading = false;

                            that.resetInputFileInput();
                            that.inputTemplateLoaded = true;

                        } else if (xhr.readyState == 4) {

                            toastr.error('Sorry, an error occured while uploading your file, please review the CSV and try again.')
                            that.isUploading = false;

                        }

                    };

                    xhr.setRequestHeader('X_FILENAME', file.name);
                    xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);

                    xhr.send(file)
                },

                handleOutputUpload: function () {

                    this.isUploading = true;

                    this.scope.$apply();

                    var file = angular.element('#output-file-uploader')[0].files[0];

                    if (file == undefined) {
                        toastr.error('Sorry, an error occured while uploading your file, please review the CSV and try again.')
                        this.isUploading = false;
                        this.resetInputFileInput();
                        return;
                    }

                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', API.url + '/storage/sample-import/' + this.outputSampleType.id, true);

                    this.outputErrorCount = 0

                    var that = this;
                    xhr.onreadystatechange = function () {

                        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {

                            that.outputData = JSON.parse(xhr.responseText)

                            that.outputImportGrid = sampleGridFactory.getImportGrid(that.outputData);
                            sampleImportManager.setImportData(that.outputImportGrid.data);
                            that.outputStorageGrid = sampleGridFactory.getStorageImportGrid(that.outputData);

                            that.scope.$apply();

                            that.isUploading = false;

                            that.resetOutputFileInput();
                            that.outputTemplateLoaded = true;

                        } else if (xhr.readyState == 4) {

                            toastr.error('Sorry, an error occured while uploading your file, please review the CSV and try again.')
                            $scope.errorCount++;
                            $scope.isUploading = false;

                        }

                    };

                    xhr.setRequestHeader('X_FILENAME', file.name);
                    xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);

                    xhr.send(file)
                },

                complete: function () {

                    this.isUploading = true;

                    var that = this;

                    var bulkSamples = [];

                    var inputSampleIds = [];

                    angular.forEach(that.inputImportGrid.data, function (sample) {

                        bulkSamples.push(sample);

                    });

                    angular.forEach(that.outputImportGrid.data, function (sample) {

                        sample.lot = that.requestObject.alias;

                        bulkSamples.push(sample);

                    });

                    var sampleSaveData = {
                        catalogData: that.catalogData,
                        samples: bulkSamples
                    };

                    $cbResource.create('/storage/sample-import/save', sampleSaveData).then(function (response) {

                        that.resultSampleIds = response.data;

                        var data = {
                            id: that.requestObject.id,
                            entity: that.entity,
                            totalOutputSamples: that.totalOutputSamples,
                            sampleType: that.outputSampleType.name,
                            catalog: that.catalogData.catalogName,
                            outputTemplateType: that.outputTemplateType,
                            outputSampleDefaults: that.outputSampleDefaults,
                            resultSampleIds: that.resultSampleIds
                        };

                        $cbResource.create(that.completeUrl, data).then(function (response) {
                            that.isUploading = false;
                            StepsService.steps(that.name).next();
                        });

                    })

                }
            };

            ProductionPipelineFactory.create = function () {

                    return new ProductionPipelineFactory();

            };

            return ProductionPipelineFactory;

        }

    ])
;


