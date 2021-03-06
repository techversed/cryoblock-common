angular.module('session.authInterceptor', [])

    .factory('authInterceptor',['$localStorage', 'API',

        function ($localStorage, API) {

            // for all jquery ajax requests
            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);
                }
            });

            return {

                request: function(config) {

                    config.headers = config.headers || {};

                    if (typeof $localStorage.User !== 'undefined') {
                        config.headers.apikey = $localStorage.User.apiKey;
                    }

                    return config;
                }

            };

        }

    ])

    .config(function($httpProvider) {

      $httpProvider.interceptors.push('authInterceptor');

    })

    .run(['$rootScope', '$location', 'sessionFactory', '$state', 'toastr', 'redirectService', function ($rootScope, $location, sessionFactory, $state, toastr, redirectService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

            if (toState.name === 'login' || toState.name === 'password_reset' || toState.name === 'password_reset_confirm' || toState.name === 'backstock_itemrequest.placement') {
                return;
            }

            var stateSecurity = toState.security || {roles:['ROLE_USER']};

            var hasPermission = false;
            angular.forEach(stateSecurity.roles, function (role) {

                if (sessionFactory.hasRole(role)) {

                    hasPermission = true;

                }

            });

            if (hasPermission) {
                return;
            }

            // user shouldnt be here
            event.preventDefault();

            // not logged in so go to login
            if (!sessionFactory.isLoggedInUser()) {

                redirectService.setRedirect(toState, toParams);

                $state.go('login');

                return;

            }

            // We should try to avoid hard coding this
            if (sessionFactory.hasRole('ROLE_UNDERGRAD_STUDENT_WORKER')){
                $state.go('backstock_order.index');

                redirectService.setRedirect(toState, toParams);


                return;

            }

            toastr.error('Sorry, you don\'t have permission to view the ' + (toState.pageTitle || 'requested') + ' page. Contact your administrator to get access.')

            // logged in but didn't come from anywhere so lets go to dashboard
            if (fromState.name === "") {
                $state.go('dashboard.main');
                return;
            }

            $state.go(fromState);

        });

    }])
;
