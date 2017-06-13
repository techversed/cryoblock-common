angular.module('attachment.cbAttachmentDirective', [])

    .directive('cbAttachment', [

        function () {

            return {

                scope: {},

                restrict: 'E',

                templateUrl: 'common/attachment/partials/cb-attachment-tpl.html',

                controller: function ($scope) {

                },

                link: function ($scope, element, attrs) {

                }

            }

        }

    ])
;
