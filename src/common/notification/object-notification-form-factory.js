angular.module('notification.objectNotificationFormFactory', [])

    .factory('objectNotificationFormFactory', ['$uibModal', '$cbResource', 'groupGridFactory',

        function ($uibModal, $cbResource, groupGridFactory) {

            var objectNotificationFormFactory = {

                openForm: function (objectType) {

                    $uibModal.open({
                        templateUrl: 'common/notification/partials/object-notification-form-tpl.html',
                        controller: 'objectNotificationFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            objectNotification: function () {

                                return $cbResource.getOne('/object-notification', {'objectType[EQ]': objectType});

                            },

                            objectType: function () {
                                return objectType;
                            },

                            groupGrid: function () {

                                return groupGridFactory.getOneToOneGrid();

                            }

                        }
                    });

                }

            };

            return objectNotificationFormFactory;
        }

    ])
;
