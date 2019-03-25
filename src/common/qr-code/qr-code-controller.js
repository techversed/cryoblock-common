angular.module('qrCode.qrCodeCtrl', [])
    .controller('qrCodeCtrl', ['$scope', '$element', 'qrCodeFactory',

        function ($scope, $element, qrCodeFactory) {

            var temp = qrCodeFactory(10,'H');
            temp.addData($scope.value);
            temp.make();
            $scope.downloadLink = temp.createDataURL(4,0);


            $element[0].children[0].children[0].innerHTML = "<a download='"+$scope.name+"' href=" + $scope.downloadLink +  " >" +  temp.createImgTag(4,0) + "</a>";

        }

    ]);
