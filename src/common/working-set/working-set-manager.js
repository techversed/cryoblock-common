angular.module('workingSet.workingSetManager', [])

    .service('workingSetManager', ['sessionFactory', '$cbResource',

        function (sessionFactory, $cbResource) {

            var workingSetManager = {

                loading: false,

                data: [],

                deselectAll: function() {
                    this.data = this.data.map(function(entity){
                        entity.selected = false;
                        return entity;
                    });
                },

                selectAll: function() {
                    this.data = $scope.data.map(function(entity){
                            entity.selected = true;
                            return entity;
                    });
                },

                refresh: function () {

                    console.log("running");

                    if(this.loading == true){
                        return;
                    }

                    this.loading = true;

                    $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {
                        var resData = response['data'];
                        var scopeData;

                        if ($this.data == []) { // Change this before going into production.
                            console.log("it was undefined");
                             scopeData = [{"id":1}];
                        }
                        else {
                            scopeData = this.data
                        }

                        var scopeDataIds = scopeData.map(function(entry){
                            return entry.id
                        });

                        var resDataIds = resData.map(function(entry){
                            return entry.id
                        });

                        scopeData = scopeData.filter(function(entry){
                            return resDataIds.indexOf(entry.id)!=-1;
                        });

                        resData = resData.filter(function(entry){
                            return scopeDataIds.indexOf(entry.id)==-1;
                        });

                        resData = resData.map(function(entry){
                            entry.selected = false;
                            return entry;
                        });

                        this.data = scopeData.concat(resData);
                        this.loading = false;
                    })

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

            return workingSetManager;

        }
    ])
;
