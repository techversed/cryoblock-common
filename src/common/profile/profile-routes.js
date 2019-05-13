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

                                    grid: function ($cbGridBuilder, sessionFactory)  {
                                        var url;
                                        var username = sessionFactory.getLoggedInUser().username;
                                        overrides = {'url': '/log-entry?username[EQ]=' + username, 'bindToState': false};
                                        return $cbGridBuilder.buildIndex('profileActivityGridFactory', overrides);
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

                                    grid: function ($cbGridBuilder, sessionFactory, user)  {
                                        var url;
                                        var username = user.username; // Use the user from above instead of the one on session.
                                        overrides = {'url': '/log-entry?username[EQ]=' + username, 'bindToState': false};
                                        return $cbGridBuilder.buildIndex('profileActivityGridFactory', overrides);
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
