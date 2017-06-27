angular.module('form.cbFormDirective', [])

    .directive('cbForm', [

        function () {

            return {

                require: '^form',

                scope: {
                    form: '='
                },

                restrict: 'E',

                templateUrl: 'common/form/partials/cb-form-tpl.html',

                transclude: true,

                controller: function ($scope) {

                },


            }

        }

    ])
;
