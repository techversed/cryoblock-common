angular.module('admin.adminFactory', [])
    .factory('adminFactory', ['$http', 'API',

        function ($http, API) {

            var adminFactory = {

                getUsers: function () {

                    var url = API.url + '/user?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                createUser: function (user) {

                    var url = API.url + '/user';

                    var promise = $http.post(url, user).then(function (response) {
                        return response.data.data;
                    });

                    return promise;

                },

                getRoles: function () {

                    var url = API.url + '/role?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                createRole: function (roles) {

                    var url = API.url + '/roles';

                    var promise = $http.post(url, roles).then(function (response) {
                        return response.data.data;
                    });

                    return promise;

                },

                getGroups: function () {

                    var url = API.url + '/group?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                createGroup: function (group) {

                    var url = API.url + '/group';

                    var promise = $http.post(url, group).then(function (response) {
                        return response.data.data;
                    });

                    return promise;

                },

                deactivateUser: function (userId) {

                    var url = API.url + '/user?id=' + userId;

                    var promise = $http.delete(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

            };

            return adminFactory;
        }

    ])
;
