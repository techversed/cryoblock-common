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
                                url: '/:id?sampleId',
                                name: 'detail',
                                pageTitle: 'Storage Division {id}',
                                data: { specialClass: 'storage-division-body' },
                                security: {
                                    roles: ['ROLE_USER']
                                },
                                params: {
                                    selectedSampleId: null,
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

                                            divisionGrid: function ($cbGridBuilder) {

                                                return $cbGridBuilder.buildIndex('storageDivisionGridFactory');

                                            }

                                        }

                                    }
                                }
                            },

                        ]

                    }
                ]
            })
        ;

    })

;
