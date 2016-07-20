angular.module('resource.factory', [])

    .factory('resourceFactory', ['$http', 'API',

        function ($http, API) {

            var resourceFactory = {

                defaults: {
                    'cOrderBy': 'id',
                    'cOrderByDirection': 'DESC',
                    'cPerPage': 25
                },

                getOne: function (url, options) {

                    return this.get(url, options).then(function (response) {
                        return response.data[0];
                    });

                },

                get: function (url, options) {

                    if (options === undefined) {
                        options = {};
                    }

                    options = angular.extend(this.defaults, options);

                    var params = [];
                    angular.forEach(options, function (option, key) {
                        params.push(key + '=' + option);
                    });

                    url = API.url + url + '?' + params.join('&');

                    return $http.get(url).then(function (response) {
                        return response.data;
                    });

                },

                create: function (url, obj, options) {

                    return $http.post(API.url + url, obj);

                },

                update: function (url, obj, options) {

                    return $http.put(API.url + url, obj);

                }

            };

            return resourceFactory;
        }

    ])
;
