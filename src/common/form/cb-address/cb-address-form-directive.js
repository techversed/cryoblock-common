angular.module('form.cbAddress.cbAddressFormDirective', [])

    .directive('cbAddressForm', ['gridFactory', '$http', 'API',

        function (gridFactory, $http, API) {

            return {

                require: '^form',

                restrict: 'E',

                templateUrl: 'common/form/cb-address/partials/cb-address-form-tpl.html',

                scope: {
                    parentObject: '=',
                    bindTo: '@',
                },

                controller: function ($scope) {

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

                    $scope.toggleAdd = function () {

                        $scope.showAdd = $scope.showAdd ? false : true;
                        $scope.show = false;

                    };

                    $scope.remove = function (address) {

                        swal({
                            title: "Are you sure?",
                            text: "This address will be removed after saving.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            closeOnConfirm: true
                        }, function() {
                            $scope.addresses.splice($scope.addresses.indexOf(address), 1);
                            $scope.$apply();
                        });

                    };

                    $scope.edit = function (address) {
                        $scope.address = angular.copy(address);
                        $scope.currentAddressIndex = $scope.addresses.indexOf(address);
                        $scope.toggleAdd();
                    };

                    $scope.cancelEdit = function () {
                        $scope.submitted = false;
                        $scope.toggleAdd();

                        if ($scope.addresses.length > 0) {
                            $scope.toggle();
                        }
                    };

                    $scope.createAddress = function () {
                        $scope.address = {};
                        $scope.currentAddressIndex = $scope.addresses.length;
                        $scope.toggleAdd();
                    }

                    $scope.saveAddress = function (isValid) {

                        $scope.submitted = true;

                        if (!isValid) {
                            return;
                        }

                        $scope.addresses[$scope.currentAddressIndex] = $scope.address;

                        if ($scope.currentAddressIndex == 0) {
                            $scope.setDefault($scope.address);
                        }

                        $scope.toggleAdd();
                        $scope.toggle();
                    };

                    $scope.setDefault = function (defaultAddress) {

                        angular.forEach($scope.addresses, function (address) {
                            address.isDefault = (address == defaultAddress);
                        });

                    };

                },

                link: function ($scope, element, attrs, formCtrl) {

                }

            }

        }

    ])

;
