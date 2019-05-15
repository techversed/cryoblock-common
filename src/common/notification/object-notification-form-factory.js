angular.module('notification.objectNotificationFormFactory', [])

    .factory('objectNotificationFormFactory', ['$uibModal', '$cbResource', 'sessionFactory', '$cbGridBuilder',

        function ($uibModal, $cbResource, sessionFactory, $cbGridBuilder) {

            var objectNotificationFormFactory = {

                openAdministratorForm: function (entity, objectDescription, adminRole, url) {

                    $uibModal.open({
                        templateUrl: 'common/notification/partials/object-notification-form-tpl.html',
                        controller: 'objectNotificationFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            adminRole: function () {

                                return adminRole;

                            },

                            entityDetail: function () {

                                return $cbResource.getOne('/cryoblock/entity-detail', {'objectClassName[EQ]': entity});

                            },

                            groupObjectNotification: function () {

                                return $cbResource.getOne('/cryoblock/entity-detail', {'objectClassName[EQ]': entity}).then(function (response) {

                                    return $cbResource.getOne('/cryoblock/group-object-notification', {'linkedEntityDetailId[EQ]': response.id});

                                });

                            },

                            onCreateGroupGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('groupGridFactory', true);

                            },

                            onUpdateGroupGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('groupGridFactory', true);

                            },

                            onDeleteGroupGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('groupGridFactory', true);

                            }

                        }
                    });

                },

                openUserForm: function (entity, objectDescription, url) {

                    $uibModal.open({
                        templateUrl: 'common/notification/partials/user-object-notification-form-tpl.html',
                        controller: 'userObjectNotificationFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            entityDetail: function () {

                                return $cbResource.getOne('/cryoblock/entity-detail', {'objectClassName[EQ]': entity});

                            },

                            userObjectNotification: function () {

                                var loggedInUser = sessionFactory.getLoggedInUser();

                                return $cbResource.getOne('/cryoblock/entity-detail', {'objectClassName[EQ]': entity}).then( function (response) {

                                    return $cbResource.getOne('/cryoblock/user-object-notification', {'linkedEntityDetailId[EQ]': response.id, 'userId[EQ]': loggedInUser.id, 'entityId[NULL]': true});

                                });

                            }

                        }
                    });

                }

            };

            return objectNotificationFormFactory;
        }

    ])
;
