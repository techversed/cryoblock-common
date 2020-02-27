angular.module('cbResource.$cbResource', [])

    .factory('$cbResource', ['$http', 'API', 'toastr', '$q', '$injector',

        function ($http, API, toastr, $q, $injector) {

            var $cbResource = {

                getOne: function (url, params, ignoreLoadingBar) {

                    return this.get(url, params, ignoreLoadingBar).then(
                        function (response) {
                            return response.data[0];
                        },
                        $cbResource.handleFailure
                    );

                },

                // get a list of elements based upon an array of ids
                    // It looks like get one resolves all the promises before it returns... I don't know if the way I am handling this really makes sense.
                    // Come back and verify that this is working
                getSelectIds: function (url, params, ids, ignoreLoadingBar) {

                    requests = [];

                    //The angular.forEach was messing up this.getOne ... seems to be in a different scope.
                    for (var i =0; i<ids.length; i++)  {
                        requests.push(this.getOne(url +'?id[EQ]=' + ids[i], true));
                    }

                     completed = [];
                     return $q.all(requests).then(function (testarr){
                        angular.forEach(testarr, function (test){
                            completed.push(test);
                        });
                        return completed;
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

                    //
                    if (ignoreLoadingBar !== undefined) {
                        additionalParams = {'ignoreLoadingBar': ignoreLoadingBar}
                    }

                    return $http.get(url, additionalParams).then(
                        function (response) {
                            return response.data;
                        },
                        $cbResource.handleFailure
                    );

                },

                create: function (url, obj) {

                    return $http.post(API.url + url, obj).then(
                        function (response) {
                            return response
                        },
                        $cbResource.handleFailure
                    );

                },

                update: function (url, obj, params) {

                    url = API.url + url

                    if (params !== undefined) {
                        url = url + '?' + this.serializeParams(params);
                    }

                    return $http.put(url, obj).then(
                        function (response) {
                            return response
                        },
                        $cbResource.handleFailure
                    );

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

                },

                delete: function (url, params) {

                    url = API.url + url

                    if (params !== undefined) {
                        url = url + '?' + this.serializeParams(params);
                    }

                    return $http.delete(url).then(
                        function (response) {
                            return response
                        },
                        $cbResource.handleFailure
                    );

                },

                purge: function (url, params) {

                    url = API.url + url

                    if (params !== undefined) {
                        url = url + '?' + this.serializeParams(params);
                    }

                    return $http({
                        method: 'PURGE',
                        url: url
                    }).then(
                        function (response) {
                            return response
                        },
                        $cbResource.handleFailure
                    );

                },

                restore: function (url, params) {

                    url = API.url + url

                    if (params !== undefined) {
                        url = url + '?' + this.serializeParams(params);
                    }

                    return $http.patch(url).then(
                        function (response) {
                            return response
                        },
                        $cbResource.handleFailure
                    );

                },

                handleFailure: function (response) {

                    var message;

                    if (response.status == 401) {
                        message = response.headers('www-authenticate');
                        toastr.error(message + ' Please contact your administrator for more information.', null, {timeOut: 7000});
                    } else if (response.status == 403) {
                        message = response.headers('cb-delete-message');
                        toastr.error(message + ' Please contact your administrator for more information.', null, {timeOut: 10000});
                    } else if (response.status == 400 && response.data.violations != undefined) {
                        angular.forEach(response.data.violations, function(violation) {
                            toastr.error(violation[0], null, {timeOut: 10000});
                        });
                    } else {
                        toastr.error('Sorry, an error occurred while making your request. Pleast contact your administrator for more information.');
                    }

                    return $q.reject(response);

                }

            };

            return $cbResource;
        }

    ])
;
