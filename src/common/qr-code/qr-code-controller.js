angular.module('qrCode.qrCodeCtrl', [])
    .controller('qrCodeCtrl', ['$scope', '$element', 'qrCodeFactory',

        function ($scope, $element, qrCodeFactory) {

            var temp = qrCodeFactory(10,'M');
            temp.addData("https://crowelab-utilities.service.vumc.org/#/storage/sample/index");
            temp.make();
            // $scope.qr = temp.createSvgTag({ cellSize: 4, margin: 0, xscalable: true });

            $element[0].children[0].children[0].innerHTML = temp.createImgTag(4,0);

        }

    ]);
