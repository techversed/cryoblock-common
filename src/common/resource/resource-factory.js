angular.module('resource.factory', [])

    .factory('resourceFactory', ['$http', 'API',

        function ($http, API) {

            var resourceFactory = {

                getOne: function (url, params) {

                    return this.get(url, params).then(function (response) {
                        return response.data[0];
                    });

                },

                get: function (url, params) {

                    if (params === undefined) {
                        params = {};
                    }

                    url = API.url + url + '?' + this.serializeParams(params);

                    return $http.get(url).then(function (response) {
                        return response.data;
                    });

                },

                create: function (url, obj, params) {

                    return $http.post(API.url + url, obj);

                },

                update: function (url, obj, params) {

                    return $http.put(API.url + url, obj);

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

                }

            };

            return resourceFactory;
        }

    ])
;
