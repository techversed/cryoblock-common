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



// Had to move this to the directive that we are dealing with.
                refresh: function () {
                    console.log('workingSetManager', workingSetManager);
                    // this.data = this.data;
                    // return;

                    // if(this.loading == true){
                    //     return;
                    // }

                    // this.loading = true;
                    // // var data = this.data;
                    // var that = this;

                    // console.log("1");
                    // $cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(that.handleReponse);
                    // console.log("1");

                    // console.log($cbResource.get('/storage/working-set-sample/user/' + sessionFactory.getLoggedInUser().id, {}, true).then(function (response) {
                    //     return response.data;
                    //     // console.log("this.data", data);
                    //     // return

                    //     // return 0;
                    //     // console.log("1");
                    //     // return [{'id': "ballz"}];

                    //     console.log("response.data", response.data);
                    //     var resData = response['data'] ? response['data'] : [];
                    //     var scopeData = that.data ? that.data : [];

                    //     console.log("resData", resData);
                    //     console.log("2");

                    //     if (scopeData.length > 0 && resData.length > 0) {
                    //         console.log("3");
                    //         var scopeDataIds = scopeData.map(function (entry) {
                    //             return entry.id;
                    //         });

                    //         var resDataIds = resData.map(function (entry) {
                    //             return entry.id;
                    //         });

                    //         scopeData = scopeData.filter(function (entry) {
                    //             return resDataIds.indexOf(entry.id) != -1;
                    //         });

                    //         resData = resData.filter(function (entry) {
                    //             return scopeDataIds.indexOf(entry.id) == -1;
                    //         });
                    //         console.log("4");
                    //     }

                    //         console.log("4");
                    //     if (resData.length > 0) {
                    //         console.log("4");
                    //         resData = resData.map(function (entry) {
                    //             entry.selected = false;
                    //             return entry;
                    //         });

                    //         return scopeData.concat(resData);
                    //     }
                    //     else return scopeData;

                    // }));

                    // console.log(this.data);
                    // this.loading = false;

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
