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

                                    userGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('userGridFactory');

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

                                    },

                                    groups: function ($cbGridBuilder, user) {

                                        return $cbGridBuilder.buildOTM(
                                            '/user-group/user/', 'groupGridFactory', user, false
                                        )

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

                                    groupGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('groupGridFactory');

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

                                    },

                                    users: function ($cbGridBuilder, group) {

                                        return $cbGridBuilder.buildOTM(
                                            '/user-group/group/', 'userGridFactory', group, false
                                        );

                                    },

                                    roles: function ($cbGridBuilder, group) {

                                        return $cbGridBuilder.buildOTM(
                                            '/group-role/group/', 'roleGridFactory', group, false
                                        );

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

                                    roleGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('roleGridFactory');

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

                                    },

                                    groups: function ($cbGridBuilder, role) {

                                        return $cbGridBuilder.buildOTM(
                                            '/group-role/role/', 'groupGridFactory', role, false
                                        )

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
