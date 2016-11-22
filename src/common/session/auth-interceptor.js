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

    .run(['$rootScope', '$location', 'sessionFactory', '$state', 'toastr', function ($rootScope, $location, sessionFactory, $state, toastr) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

            if (toState.name === 'login') {
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
                $state.go('login');
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

