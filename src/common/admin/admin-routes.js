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
                        url: '/index',
                        name: 'index',
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-tpl.html',
                                controller: 'adminCtrl',
                                data: {
                                    pageTitle: 'Administrator',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                },
                                resolve: {

                                    userRequest: function (adminFactory) {

                                        return adminFactory.getUsers();

                                    },

                                    roleRequest: function (adminFactory) {

                                        return adminFactory.getRoles();

                                    },

                                    groupRequest: function (adminFactory) {

                                        return adminFactory.getGroups();

                                    }

                                }

                            }
                        }
                    },
                    {
                        url: '/create-user',
                        name: 'createUser',
                        views: {
                            content: {

                                templateUrl: 'common/admin/views/admin-user-create-tpl.html',
                                controller: 'userCreateCtrl',
                                data: {
                                    pageTitle: 'Create User',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                }

                            }
                        }
                    }
                ]
            })
        ;

    })

;
