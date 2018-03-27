angular.module('print.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/print',
                name: 'print',
                views: {
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/sample',
                        name: 'sample',
                        pageTitle: 'Sample Print',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'common/print/views/print-sample-import-tpl.html',
                                controller: 'printSampleImportCtrl'
                            }
                        }
                    }
                ]
            })
        ;

    })

;

