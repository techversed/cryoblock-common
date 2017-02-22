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
                        url: '/user/:id',
                        name: 'user_detail',
                        pageTitle: 'User {id}',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-user-detail-tpl.html',
                                controller: 'adminUserDetailCtrl',
                                resolve: {

                                    user: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/user?id[EQ]=' + $stateParams.id);

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
                        url: '/group/:id',
                        name: 'group_detail',
                        pageTitle: 'Group {id}',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-group-detail-tpl.html',
                                controller: 'adminGroupDetailCtrl',
                                resolve: {

                                    group: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/group?id[EQ]=' + $stateParams.id);

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
                    },
                    {
                        url: '/role/:id',
                        name: 'role_detail',
                        pageTitle: 'Role {id}',
                        security: {
                            roles: ['ROLE_ADMIN']
                        },
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-role-detail-tpl.html',
                                controller: 'adminRoleDetailCtrl',
                                resolve: {

                                    role: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/role?id[EQ]=' + $stateParams.id);

                                    }

                                }

                            }
                        }
                    },
                ]
            })
        ;

    })

;
