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

            .state({
                url: '/user/password-reset',
                name: 'password_reset',
                data: { pageTitle: 'Reset Password', specialClass: 'gray-bg' },
                views: {
                    content: {
                        templateUrl: 'common/login/views/password-reset-tpl.html',
                        controller: 'passwordResetCtrl'
                    }
                }
            })

            .state({
                url: '/user/password-reset/confirm/:token',
                name: 'password_reset_confirm',
                data: { pageTitle: 'Reset Password Confirmation', specialClass: 'gray-bg' },
                views: {
                    content: {
                        templateUrl: 'common/login/views/password-reset-confirm-tpl.html',
                        controller: 'passwordResetConfirmCtrl'
                    }
                }
            })
        ;

    })

;
