angular.module('qrCode.cbQrCodeDirective', [])
    .directive('cbQrCode', [

        function () {

            return {

                scope: {
                    value: '@',
                    name: '@'
                },

                restrict: 'E',

                templateUrl: 'common/qr-code/partials/cb-qr-code-tpl.html',

                controller: 'qrCodeCtrl',

                link: function ($scope, element, attrs) {
                    $scope.name ="testing";
                    // $scope.name ? $scope.name : $scope.value;

                }
            };
        }
    ]
);
