angular.module('storage.storageFactory', [])

    .factory('storageFactory', ['$http', 'API', '$cbResource', '$q',

        function ($http, API, $cbResource, $q) {

            var storageFactory = {

                getParentDivisions: function () {

                    return $cbResource.get('/storage/division-tree').then(function (result) {

                        result[0].initialized = true;
                        angular.forEach(result[0]['__children'], function (child) {
                            child['__children'] = [];
                            child.initialized = false;
                        });

                        return result;

                    });

                },

                getDivision: function (divisionId) {

                    var req = {
                        method: 'GET',
                        url: API.url + '/storage/division?id[EQ]=' + divisionId,
                        headers: {
                            'X-CARBON-SERIALIZATION-GROUPS': 'default,parent,children,samples'
                        }

                    };

                    var promise = $http(req).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                updateDivision: function (division) {

                    var url = API.url + '/storage/division?id=' + division.id;

                    return $http.put(url, division);

                },

                getDivisionChildren: function (division) {

                    return $cbResource.get('/storage/division-children/' + division.id);

                },

                getDivisionChildren2: function (parentId) {

                    var url = API.url + '/storage/division?parentId[EQ]=' + parentId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivisionSampleTypes: function (divisionId) {

                    var url = API.url + '/storage/division-sample-type/division/' + divisionId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;

                },

                getDivisionStorageContainers: function (divisionId) {

                    var url = API.url + '/storage/division-storage-container/division/' + divisionId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;

                },

                removeStorageSamples: function (samples, newStatus) {

                    var sampleIds = [];
                    angular.forEach(samples, function (sample) {
                        sampleIds.push(sample.id);
                    });

                    var data = {
                        sampleIds: sampleIds,
                        status: newStatus
                    };

                    return $cbResource.create('/storage/sample/storage-remove', data);

                },

                moveSamples: function (sampleMoveMap, division) {

                    var data = sampleMoveMap.map(function (map) {
                        var sample = angular.copy(map.sample);
                        sample.division = {id: division.id};
                        sample.divisionRow = map.row;
                        sample.divisionColumn = map.column;
                        return sample;
                    });

                    return $cbResource.create('/storage/sample/storage-move', data);

                }

            }

            return storageFactory;
        }

    ])
;
