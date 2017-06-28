angular.module('profile.profileFactory', [])
    .factory('profileFactory', ['$http', 'API',

        function ($http, API) {

            var profileFactory = {

                getUser: function (userId) {

                    var url = API.url + '/user?id=' + userId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data.data[0];
                    });

                    return promise;
                },

                getActivity: function (username) {

                    var url = API.url + '/log-entry?username[EQ]=' + username;

                    var promise = $http.get(url).then(function (response) {
                        return response.data.data;
                    });

                    return promise;
                }

            };

            return profileFactory;
        }

    ])
;
