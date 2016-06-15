angular.module('profile.routes', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/profile',
                name: 'profile',
                views: {
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        views: {
                            content: {

                                templateUrl: 'common/profile/profile-tpl.html',
                                controller: 'profileCtrl',
                                data: {
                                    pageTitle: 'Profile',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    }
                                },
                                resolve: {

                                    user: function (sessionFactory, profileFactory) {

                                        if (sessionFactory.isLoggedInUser()) {

                                            return sessionFactory.getLoggedInUser();

                                        }

                                        return profileFactory.getUser($localStorage.User.id);

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
