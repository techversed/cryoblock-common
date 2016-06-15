angular.module('form.routes', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/form',
                name: 'form',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        templateUrl: 'common/form/form-tpl.html',
                        url: '/index',
                        name: 'index',
                        data: {
                            pageTitle: 'Forms',
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        },
                    }
                ]
            })
        ;

    })
;
