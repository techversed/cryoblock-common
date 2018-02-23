angular.module('productionPipeline.productionPipelineFactory', [])

    .factory('productionPipelineFactory', ['productionPipelineStepFactory', 'StepsService', '$cbResource', 'API', '$localStorage', 'sampleGridFactory', 'sampleImportManager',

        function (productionPipelineStepFactory, StepsService, $cbResource, API, $localStorage, sampleGridFactory, sampleImportManager) {

            var ProductionPipelineFactory = function () {

                this.scope = null;

                this.name = null;

                this.steps = [];

                this.currentStep = null;

                this.entity = null;

                this.requestObject = null;

                this.totalOutputSamples = 0;

                this.catalog = 'BG505';

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

                s2ab: function (s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                },

                downloadInputTemplate: function () {

                    var that = this;

                    var data = {
                        entity: this.entity,
                        id: this.requestObject.id
                    };

                    // $cbResource.create('/production/download-input-template', data).then(function (response) {
                    //     console.log(response.data);

                    //     var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

                    //     var windowUrl = window.URL || window.webkitURL;
                    //     var url = windowUrl.createObjectURL(blob);

                    //     // var filename = that.requestObject.alias + ' Input Samples Template.xlsx';
                    //     var filename = 'PhpExcelFileSample.xlsx';

                    //     var a = document.createElement('a');

                    //     a.href = url;
                    //     a.download = filename;
                    //     a.click();
                    //     window.URL.revokeObjectURL(url);

                    // });


                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', API.url + '/production/download-input-template' , true);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.setRequestHeader('X_FILENAME', 'test.xlsx');
                    xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                    xhr.responseType= 'blob';

                    xhr.onreadystatechange = function () {
                        console.log(xhr.response);
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {

                                var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                var blob = new Blob([xhr.response], { type: contentType });

                                var windowUrl = window.URL || window.webkitURL;
                                var url = windowUrl.createObjectURL(blob);
                                var filename = 'PhpExcelFileSample.xlsx';
                                var a = document.createElement('a');

                                a.href = url;
                                a.download = filename;
                                a.click();
                                window.URL.revokeObjectURL(url);


                                // observer.next(blob);
                                // observer.complete();
                            } else {
                                // observer.error(xhr.response);
                            }
                        }
                    };

                    xhr.send(JSON.stringify(data));


                },

                downloadOutputTemplate: function () {

                    var that = this;

                    var data = {
                        entity: this.entity,
                        id: this.requestObject.id,
                        totalOutputSamples: that.totalOutputSamples,
                        sampleType: this.outputSampleType.name,
                        catalog: this.catalog
                    };

                    $cbResource.create('/production/download-output-template', data).then(function (response) {

                        var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

                        var windowUrl = window.URL || window.webkitURL;
                        var url = windowUrl.createObjectURL(blob);

                        var filename = that.requestObject.alias + ' Output Samples Template.xlsx';

                        var a = document.createElement('a');

                        a.href = url;
                        a.download = filename;
                        a.click();
                        window.URL.revokeObjectURL(url);

                    });

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
                            $scope.errorCount++;
                            $scope.isUploading = false;

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

                    var bulkSamples = []

                    var that = this;

                    angular.forEach(that.inputImportGrid.data, function (sample) {

                        bulkSamples.push(sample);

                    });

                    angular.forEach(that.outputImportGrid.data, function (sample) {

                        sample.lot = that.requestObject.alias;

                        bulkSamples.push(sample);

                    });

                    $cbResource.create('/storage/sample-import/save', bulkSamples).then(function (response) {

                        that.resultSampleIds = response.data;

                        $cbResource.create('/production/dna/' + that.requestObject.id + '/complete', that.resultSampleIds).then(function (response) {
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


