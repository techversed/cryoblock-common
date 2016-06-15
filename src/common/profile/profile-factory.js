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
                }

            };

            return profileFactory;
        }

    ])
;
