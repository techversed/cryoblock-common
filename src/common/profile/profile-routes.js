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
