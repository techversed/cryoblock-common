angular.module('form.cbAddress.cbAddressDetailDirective', [])

    .directive('cbAddressDetail', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {



                restrict: 'E',

                templateUrl: 'common/form/cb-address/partials/cb-address-detail-tpl.html',

                scope: {
                    parentObject: '=',
                    bindTo: '@',
                },

                controller: function ($scope) {
                    console.log($scope.parentObject[$scope.bindTo])
                    $scope.addresses = $scope.parentObject[$scope.bindTo];
                    $scope.addressForm = {};

                    $scope.show = false;

                    $scope.toggle = function () {

                        if (!$scope.addresses.length) {
                            $scope.createAddress();
                            return;
                        }

                        $scope.show = $scope.show ? false : true;
                        $scope.showAdd = false;

                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                }

            }

        }

    ])

;
