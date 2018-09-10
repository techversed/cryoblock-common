angular.module('session.redirectService', [])

    .service('redirectService', [

        function () {

            var redirectService = {

                redirectToState: null,

                redirectToStateParams: null,

                setRedirect: function (redirectToState, redirectToStateParams) {

                    this.redirectToState = redirectToState;

                    this.redirectToStateParams = redirectToStateParams;

                },
            }

            return redirectService;
        }

    ])
;
