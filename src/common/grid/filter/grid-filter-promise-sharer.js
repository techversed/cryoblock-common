angular.module('grid.gridFilterPromiseSharer' , [])
    .service('$gridFilterPromiseSharer', ['$cbResource',

        /*
            If mutiple grids in the same page are requesting the same list this service can be used in order to ensure that only one request needs to be made for that resource.
            This works by maintainging a list of all currently oustanding promoises and allows for multiple callback functions to be registered to the same promise.
            This is only currently used by the grid-relation-filter-controller in order to only have to fetch one copy of the starting menu items for each relation filter.

            Written by Taylor Jones.

        */

        function ($cbResource) {

            var promiseGrouper =  {

                promiseMap: {},

                addPromise: function (url, params) {
                    var that = this;
                    var parTesting = $cbResource.serializeParams(params)

                    if (that.promiseMap[url+parTesting] == undefined) {

                        that.promiseMap[url+parTesting] = $cbResource.get(url, params);

                        that.promiseMap[url+parTesting].then(function (response) {
                            that.promiseMap[url+parTesting] = undefined;
                        });

                    }

                    return that.promiseMap[url+parTesting].then(function (response) {
                        return response;
                    });
                }
            };
            return promiseGrouper;
        }
    ])
;
