angular.module('qrCode.cbQrCodeDirective', [])
    .directive('cbQrCode', [

        function () {

            return {

                scope: {value: '@'},

                restrict: 'E',

                templateUrl: 'common/qr-code/partials/cb-qr-code-tpl.html',

                controller: 'qrCodeCtrl',

                link: function ($scope, element, attrs) {


                }
            };
        }
    ]
);
