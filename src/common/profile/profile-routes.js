angular.module('profile.routes', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/profile',
                name: 'profile',
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
                        pageTitle: 'Profile',
                        security: {
                            roles: ['ROLE_USER'],
                        },
                        views: {
                            content: {
                                templateUrl: 'common/profile/views/profile-tpl.html',
                                controller: 'profileCtrl',
                                resolve: {

                                    user: function (sessionFactory, profileFactory) {

                                        if (sessionFactory.isLoggedInUser()) {

                                            return sessionFactory.refreshUser();

                                        }

                                    },

                                    grid: function ($cbGridBuilder, sessionFactory)  {
                                        var url;
                                        var username = sessionFactory.getLoggedInUser().username;
                                        url = {'url': '/log-entry?username[EQ]=' + username}
                                        return $cbGridBuilder.buildIndex('profileActivityGridFactory', url);
                                    },

                                    decorator: function ($cbResource, grid) {

                                        var results = grid.results;

                                        var details = results.map(function (result) {

                                            return result.objectClass;
                                        });

                                        $cbResource.get('/cryoblock/entity-detail', {
                                            'objectClassName[IN]': details
                                        }).then(function (entityDetailResult) {
                                            var edMap = {};
                                            angular.forEach(entityDetailResult.data, function (entityDetail) {
                                                edMap[entityDetail.objectDescription] = entityDetail;
                                                console.log(entityDetail)
                                            });

                                            for (var resultIndex = 0; resultIndex < grid.results.length; resultIndex++) {
                                                grid.results[resultIndex].entityDetail = edMap[grid.results[resultIndex].objectClass];
                                                console.log(grid.results[resultIndex]);
                                            }
                                            console.log(grid.results);

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
