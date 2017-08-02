angular.module('storage.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage',
                name: 'storage',
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
                        url: '/division',
                        name: 'division',
                        data: { specialClass: 'storage-division-body' },
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            'content': {
                                templateUrl: 'common/storage/views/storage-division-index-tpl.html',
                            },
                            'storage-navigation@storage.division': {

                                templateUrl: 'common/storage/views/storage-navigation-tpl.html',
                                controller: 'storageNavigationCtrl',
                                resolve: {

                                    divisions: function (storageFactory) {

                                        return storageFactory.getParentDivisions();

                                    }

                                }

                            }
                        },
                        children: [
                            {
                                url: '/:id',
                                name: 'detail',
                                pageTitle: 'Storage Division {id}',
                                data: { specialClass: 'storage-division-body' },
                                security: {
                                    roles: ['ROLE_USER']
                                },
                                views: {
                                    'division@storage.division': {

                                        templateUrl: 'common/storage/views/storage-division-tpl.html',
                                        controller: 'storageDivisionCtrl',
                                        resolve: {

                                            division: function (storageFactory, $stateParams) {

                                                return storageFactory.getDivision($stateParams.id).then(

                                                    function(response) {

                                                        return response.data[0];
                                                    }

                                                );

                                            },

                                            childrenResponse: function (storageFactory, $stateParams) {

                                                return storageFactory.getDivisionChildren2($stateParams.id);

                                            }

                                        }

                                    }
                                }
                            },
                            {
                                url: '',
                                name: 'search',
                                pageTitle: 'Search Division',
                                data: { specialClass: 'storage-division-body' },
                                security: {
                                    roles: ['ROLE_USER']
                                },
                                views: {
                                    'division@storage.division': {

                                        templateUrl: 'common/storage/views/storage-division-search-tpl.html',
                                        controller: 'storageDivisionSearchCtrl',
                                        resolve: {

                                            divisions: function (storageFactory) {

                                                return storageFactory.getParentDivisions();

                                            }

                                        }

                                    }
                                }
                            }
                        ]

                    }
                ]
            })
        ;

    })

;
