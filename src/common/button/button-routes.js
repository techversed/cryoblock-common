angular.module('button.routes', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/button',
                name: 'button',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        templateUrl: 'common/button/button-tpl.html',
                        url: '/index',
                        name: 'index',
                        data: {
                            pageTitle: 'Buttons',
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
