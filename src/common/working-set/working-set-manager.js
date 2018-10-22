angular.module('workingSet.workingSetManager', [])

    .service('workingSetManager', ['sessionFactory', '$cbResource',

        function (sessionFactory, $cbResource) {

            var workingSetManager = {

                loading: false,

                collapsed: true,

                data: [{'id': 1}],

                deselectAll: function() {
                    this.data = this.data.map(function(entity){
                        entity.selected = false;
                        return entity;
                    });
                },

                selectAll: function() {
                    this.data = this.data.map(function(entity){
                        entity.selected = true;
                        return entity;
                    });
                },

                handleReponse: function (response){
                    console.log(this.data);
                    this.loading = false;
                },

                ngOnInit: function () {
                    console.log("init");
                },

                refresh: function () {

                    if (this.loading == true){
                        return;
                    }
                    this.loading = true;

                    $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {

                        var resData = response['data'];
                        var scopeData = workingSetManager.data;

                        if (scopeData.length > 0 && resData.length > 0) {

                            var scopeDataIds = scopeData.map(function (entry) {
                                return entry.id;
                            });

                            var resDataIds = resData.map(function (entry) {
                                return entry.id;
                            });

                            scopeData = scopeData.filter(function (entry) {
                                return resDataIds.indexOf(entry.id) != -1;
                            });

                            resData = resData.filter(function (entry) {
                                return scopeDataIds.indexOf(entry.id) == -1;
                            });

                        }

                        if (resData.length > 0) {
                            resData = resData.map(function (entry) {
                                entry.selected = false;
                                return entry;
                            });

                        }

                        workingSetManager.data = scopeData.concat(resData);
                        workingSetManager.loading = false;
                        return;

                    });

                },

                initialize: function () {
                    this.refresh();
                },

                createRequest: function () {
                    console.log("create request");
                },

                addSample: function () {
                    console.log("add sample");

                }

            };

            workingSetManager.refresh();

            return workingSetManager;

        }
    ])
;
