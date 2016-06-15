angular.module('session.authInterceptor', [])
    .factory('authInterceptor',['$localStorage', 'API',

        function ($localStorage, API) {

            // for all jquery ajax requests
            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                }
            });

            return {

                request: function(config) {

                    config.headers = config.headers || {};

                    if (typeof $localStorage.User !== 'undefined') {
                        config.headers.apikey = $localStorage.User.apiKey;
                    }

                    return config;
                }

            };

        }

])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
