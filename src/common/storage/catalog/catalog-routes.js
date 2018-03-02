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
                                controller: 'catalogCtrl',
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

                                    dnaSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 1);

                                    },

                                    proteinSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 2);

                                    },

                                    seraSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 3);

                                    },

                                    bacterialSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 4);

                                    },

                                    mammalianSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 5);

                                    },

                                    yeastSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 6);

                                    },

                                    chemicalSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 7);

                                    },

                                    solutionSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 8);

                                    },

                                    otherSamples: function (sampleGridFactory, catalog) {

                                        return sampleGridFactory.getCatalogGrid(catalog, 9);

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
