angular.module('grid.gridFilterFactory', [])

    .factory('gridFilterFactory', ['$injector',

        function ($injector) {

            var GridFilter = {

                filterTypes: {
                    'relation': {
                        'factory': 'gridRelationFilterFactory'
                    },
                    'integer': {
                        'factory': 'gridIntegerFilterFactory'
                    },
                    'enum': {
                        'factory': 'gridEnumFilterFactory'
                    }
                },

                create: function (defaults) {

                    if (defaults.type === undefined) {
                        throw Error('Filter type must be specified');
                    }

                    if (defaults.filterProperty === undefined) {
                        throw Error('Filter property must be specified');
                    }

                    var filterType = this.filterTypes[defaults.type];

                    if (filterType === undefined) {
                        throw Error('Filter type ' + defaults.type + ' does not exist');
                    }

                    var factory = $injector.get(filterType.factory);

                    if (typeof factory.create !== 'function') {
                        throw Error('Filter factory must implement create');
                    }

                    factory = factory.create(defaults);

                    if (typeof factory.getParams !== 'function') {
                        throw Error('Filter factory must implement getParams');
                    }

                    if (factory.isFiltering === undefined) {
                        throw Error('Filter factory must implement isFiltering property');
                    }

                    return factory;
                }
            };

            return GridFilter;

        }

    ])
;
