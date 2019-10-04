angular.module('storage.catalog.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage/catalog',
                name: 'catalog',
                views: {
                    navbar: {
                        templateUrl: 'navbar-tpl.html',
                    },
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/index',
                        pageTitle: 'Storage Catalog',
                        name: 'index',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'common/storage/catalog/views/catalog-index-tpl.html',
                                controller: 'catalogIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('catalogGridFactory');

                                    },

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Storage Catalog {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/storage/catalog/views/catalog-detail-tpl.html',
                                controller: 'catalogDetailCtrl',
                                resolve: {

                                    catalog: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/storage/catalog?id[EQ]=' + $stateParams.id);

                                    },

                                    sampleTypes: function ($cbResource, $stateParams) {

                                        return $cbResource.get('/storage/sample-type', {cPerPage:100});

                                    },

                                    // sequenceGrid: function ($cbGridBuilder, catalog, sequenceGridFactory) {
                                    sequenceGrid: function ($cbGridBuilder, catalog) {

                                        return sequenceGridFactory.getCatalogGrid(catalog);

                                    },

                                    grids: function (sampleTypes, catalog, sampleGridFactory, $q) {

                                        var sampleTypes = sampleTypes.data;
                                        var grids = [];
                                        var promises = [];

                                        angular.forEach(sampleTypes, function(st) {

                                            promises.push(sampleGridFactory.getCatalogGrid(catalog, st['id']));

                                        });

                                        return $q.all(promises).then(function (gridResults) {

                                            for (var sampleTypeIndex = 0; sampleTypeIndex < sampleTypes.length; sampleTypeIndex++) {

                                                grids.push({
                                                    sampleType: sampleTypes[sampleTypeIndex],
                                                    grid: gridResults[sampleTypeIndex]
                                                });

                                            }

                                            return grids;

                                        });
                                    }

                                }

                            }
                        }
                    }
                ]
            })
        ;

    })

;
