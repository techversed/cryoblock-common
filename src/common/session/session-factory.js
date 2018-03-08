angular.module('session.sessionFactory', [])

    .factory('sessionFactory', ['$http', 'API', '$localStorage', '$state',

        function ($http, API, $localStorage, $state) {

            var sessionFactory = {

                /**
                 * Authenitcate returns an API key if credentials are
                 * correct.
                 *
                 * @param  {string} username
                 * @param  {string} password
                 *
                 * @return {object} promise
                 */
                login: function (username, password) {

                    var url = API.url + '/authenticate',
                        data = {
                            username: username,
                            password: password
                        }
                    ;

                    return $http.post(url, data).then(

                        function (response) {

                            $localStorage.User = response.data;

                        }

                    );

                },

                logout: function () {

                    $localStorage.$reset();

                    $state.go('login');

                },

                isLoggedInUser: function () {

                    return typeof $localStorage.User !== 'undefined';

                },

                getLoggedInUser: function () {

                    return $localStorage.User;

                },

                refreshUser: function () {

                    var url = API.url + '/user?id[EQ]=' + this.getLoggedInUser().id;
                    var apiKey = this.getLoggedInUser().apiKey;

                    var promise = $http.get(url).then(function (response) {

                        $localStorage.User = response.data.data[0];
                        $localStorage.User.apiKey = apiKey;

                        return $localStorage.User;

                    });

                    return promise;
                },

                hasRole: function (roleCheck) {

                    if (!sessionFactory.isLoggedInUser()) {
                        return false;
                    }

                    var userRoles = sessionFactory.getLoggedInUser().roles;

                    // ADMIN is god
                    if (userRoles.indexOf('ROLE_ADMIN') > -1) {
                        return true;
                    }

                    return undefined !== userRoles.find(function (role) {
                        return role === roleCheck;
                    });

                }

            };

            return sessionFactory;
        }

    ])
;
