angular.module('commonFilters.camelToTitleFilter', [])

    .filter('camelToTitle', [

        function () {

            return function (input) {

                var inputWithSpace = input.replace(/([A-Z])/g, ' $1');

                return inputWithSpace.charAt(0).toUpperCase() + inputWithSpace.slice(1);

            }

        }

    ])
;
