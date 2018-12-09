angular.module('grid.gridFilterPromiseSharer' , [])
    .service('gridFilterPromiseSharer', ['$cbResource',

        function ($cbResource) {

            var promiseGrouper =  {

                // Store all of our promises in this
                promiseMap: {},

                // If a promise does not exist, create it if it does exist then register another callback.
                addPromise: function (url, params) {
                    //addPromise
                    var that = this;
                    if (that.promiseMap[url+params] == undefined) {

                        that.promiseMap[url+params] = $cbResource.get(url, params);

                        that.promiseMap[url+params].then(function (response) {
                            that.promiseMap[url+params] = undefined;
                        });

                    }

                    return that.promiseMap[url+params].then(function (response) {
                        return response;
                    });
                }
            };
            return promiseGrouper;
        }
    ])
;
