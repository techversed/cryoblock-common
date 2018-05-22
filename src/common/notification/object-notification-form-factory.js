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

                            entity: function () {

                                return entity;

                            },

                            objectDescription: function () {

                                return objectDescription;

                            },

                            url: function () {

                                return url;

                            },

                            adminRole: function () {

                                return adminRole;

                            },

                            groupObjectNotification: function () {

                                return $cbResource.getOne('/cryoblock/group-object-notification', {'entity[EQ]': entity});

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

                            entity: function () {

                                return entity;

                            },

                            objectDescription: function () {

                                return objectDescription;

                            },

                            url: function () {

                                return url;

                            },

                            userObjectNotification: function () {

                                var loggedInUser = sessionFactory.getLoggedInUser();

                                // return $cbResource.getOne('/cryoblock/user-object-notification', {
                                //     'entityDetailId[EQ]': 1,
                                //     'userId[EQ]': loggedInUser.id,
                                //     'entityId[NULL]': true
                                // });

                                var data = {
                                    'objectClassName[EQ]': entity
                                };

                                return $cbResource.getOne('/cryoblock/entity-detail', data).then( function (response) {
                                    return $cbResource.getOne('/cryoblock/user-object-notification', {
                                        'entityDetailId[EQ]': response.id,
                                        'userId[EQ]': loggedInUser.id,
                                        'entityId[NULL]': true
                                    });
                                });
                                // });
                                // var response = {
                                //     'id': 1
                                // };



                            }

                        }
                    });

                }

            };

            return objectNotificationFormFactory;
        }

    ])
;
