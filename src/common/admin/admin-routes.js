angular.module('admin.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/administrator',
                name: 'admin',
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
                        url: '/user',
                        name: 'user',
                        pageTitle: 'Administrator - Users',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-user-tpl.html',
                                controller: 'adminUserCtrl',
                                resolve: {

                                    userGrid: function (userGridFactory) {

                                        return userGridFactory.getIndexGrid();

                                    }

                                }

                            }
                        }
                    },
                    {
                        url: '/group',
                        name: 'group',
                        pageTitle: 'Administrator - Groups',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-group-tpl.html',
                                controller: 'adminGroupCtrl',
                                resolve: {

                                    groupGrid: function (groupGridFactory) {

                                        return groupGridFactory.getIndexGrid();

                                    }

                                }

                            }
                        }
                    },
                    {
                        url: '/role',
                        name: 'role',
                        pageTitle: 'Administrator - Roles',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-role-tpl.html',
                                controller: 'adminRoleCtrl',
                                resolve: {

                                    roleGrid: function (roleGridFactory) {

                                        return roleGridFactory.getIndexGrid();

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
