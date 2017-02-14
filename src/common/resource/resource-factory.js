angular.module('cbResource.$cbResource', [])

    .factory('$cbResource', ['$http', 'API',

        function ($http, API) {

            var $cbResource = {

                getOne: function (url, params, ignoreLoadingBar) {

                    return this.get(url, params, ignoreLoadingBar).then(function (response) {
                        return response.data[0];
                    });

                },

                get: function (url, params, ignoreLoadingBar) {

                    additionalParams = {}

                    url = API.url + url

                    if (params !== undefined && (url.indexOf('?') == -1)) {
                        url = url + '?' + this.serializeParams(params);
                    } else if (params !== undefined) {
                        url = url + '&' + this.serializeParams(params);
                    }

                    if (ignoreLoadingBar !== undefined) {
                        additionalParams = {'ignoreLoadingBar': ignoreLoadingBar}
                    }

                    return $http.get(url, additionalParams).then(function (response) {
                        return response.data;
                    });

                },

                create: function (url, obj) {

                    return $http.post(API.url + url, obj);

                },

                update: function (url, obj, params) {

                    url = API.url + url

                    if (params !== undefined) {
                        url = url + '?' + this.serializeParams(params);
                    }

                    return $http.put(url, obj);

                },

                serializeParams: function(obj, prefix) {

                    var str = [];

                    for(var p in obj) {

                        if (obj.hasOwnProperty(p)) {
                          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                          str.push(typeof v == "object" ?
                            this.serializeParams(v, k) :
                            encodeURIComponent(k) + "=" + encodeURIComponent(v));
                        }

                    }

                    return str.join("&");

                },

                count: function (url, params, ignoreLoadingBar) {

                    return this.get(url, params, ignoreLoadingBar).then(function (response) {
                        return response.unpaginatedTotal
                    });

                }

            };

            return $cbResource;
        }

    ])
;
