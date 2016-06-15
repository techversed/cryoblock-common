angular.module('login.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                url: '/login',
                name: 'login',
                data: { pageTitle: 'Login', specialClass: 'gray-bg' },
                views: {
                    content: {
                        templateUrl: 'common/login/views/login-tpl.html',
                        controller: 'loginCtrl'
                    }
                }
            })
        ;

    })

;
