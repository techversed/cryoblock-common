angular.module('carbonConfig', ['toastr'])

    .constant('API', {
        url: 'http://andre.dev.carbon.com',
        apiKeyParam: 'apikey'
    })

    // override toastr configs
    .config(['toastrConfig', function (toastrConfig) {

        angular.extend(toastrConfig, {
            closeButton: true,
            extendedTimeOut: 1000,
            maxOpened: 0,
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000,
        });

    }])

    .config(['$urlRouterProvider', function($urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

    }])
;
