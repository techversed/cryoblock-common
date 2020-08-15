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

                                    userBool: function() {
                                        return true;
                                    },

                                    watchedRequestsGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('profileWatchedRequestsGridFactory');

                                    }
                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Profile',
                        security: {
                            roles: ['ROLE_USER'],
                        },
                        views: {
                            content: {
                                templateUrl: 'common/profile/views/profile-tpl.html',
                                controller: 'profileCtrl',
                                resolve: {

                                    user: function ($cbResource, $stateParams) {  // sessionFactory, profileFactory,
                                        return $cbResource.getOne('/user?id[EQ]=' + $stateParams.id);
                                    },

                                    userBool: function(sessionFactory, $stateParams){
                                        return (sessionFactory.getLoggedInUser().id == $stateParams.id);
                                    },


                                    watchedRequestsGrid: function ($cbGridBuilder, user) {

                                        return $cbGridBuilder.buildIndex('profileWatchedRequestsGridFactory', {
                                            url: '/cryoblock/profile-object-notification/watched-requests/' + user.id,
                                            bindToState: false
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
