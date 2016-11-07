angular.module('admin.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/administrator',
                name: 'admin',
                views: {
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/user',
                        name: 'user',
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-user-tpl.html',
                                controller: 'adminUserCtrl',
                                data: {
                                    pageTitle: 'Administrator',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                },
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
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-group-tpl.html',
                                controller: 'adminGroupCtrl',
                                data: {
                                    pageTitle: 'Administrator',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                },
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
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-role-tpl.html',
                                controller: 'adminRoleCtrl',
                                data: {
                                    pageTitle: 'Administrator',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                },
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
