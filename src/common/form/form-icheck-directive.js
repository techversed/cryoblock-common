angular.module('form.icheckDirective', [])
    .directive('icheck', [
        function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });
                }
            }
        }
    ])
;
