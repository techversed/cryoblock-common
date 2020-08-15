angular.module('storageContainer.routes', ['ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage/storage-container',
                name: 'storage_container',
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
                        name: 'index',
                        pageTitle: 'Storage Containers',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'common/storage/storage-container/views/storage-container-index-tpl.html',
                                controller: 'storageContainerIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder)  {

                                        return $cbGridBuilder.buildIndex('storageContainerGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Storage Container {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'common/storage/storage-container/views/storage-container-detail-tpl.html',
                                controller: 'storageContainerDetailCtrl',
                                resolve: {

                                    storageContainer: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/storage/storage-container?id[EQ]=' + $stateParams.id);

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
