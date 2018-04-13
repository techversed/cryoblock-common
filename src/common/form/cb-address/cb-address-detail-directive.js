angular.module('form.cbAddress.cbAddressDetailDirective', [])

    .directive('cbAddressDetail',

        function () {

            return {

                restrict: 'E',

                templateUrl: 'common/form/cb-address/partials/cb-address-detail-tpl.html',

                scope: {
                    parentObject: '=',
                    bindTo: '@',
                },

                controller: function ($scope) {
                    $scope.addresses = $scope.parentObject[$scope.bindTo];
                },
            }
        }
    )
;
