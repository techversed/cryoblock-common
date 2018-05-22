angular.module('notification.objectNotificationFormFactory', [])

    .factory('objectNotificationFormFactory', ['$uibModal', '$cbResource', 'sessionFactory', '$cbGridBuilder',

        function ($uibModal, $cbResource, sessionFactory, $cbGridBuilder) {

            var objectNotificationFormFactory = {

                //This still needs to be changed to make it work with the entity detail table instead of storing things in the individual records...
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

                            //This is no longer needed.
                            objectDescription: function () {

                                return objectDescription;

                            },

                            //This is no longer needed...
                            url: function () {

                                return url;

                            },

                            adminRole: function () {

                                return adminRole;

                            },

                            entityDetail: function() {
                                return $cbResource.getOne('/cryoblock/entity-detail',{'objectClassName[EQ]': entity});
                            },

                            groupObjectNotification: function () {
                                return $cbResource.getOne('/cryoblock/entity-detail',{'objectClassName[EQ]': entity}).then( function (response) {
                                    return $cbResource.getOne('/cryoblock/group-object-notification', {'entityDetailId[EQ]': response.id});
                                })
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

                            //This is no longer needed...
                            url: function () {

                                return url;

                            },

                            //This is no longer needed....
                            entityDetail: function () {
                                var data = {
                                    'objectClassName[EQ]': entity
                                };
                                return $cbResource.getOne('/cryoblock/entity-detail', data);
                            },

                            // it is really sloppy to repeat this entity deatil query... we will fix that later on... just trying to get it working...
                            userObjectNotification: function () {

                                var loggedInUser = sessionFactory.getLoggedInUser();

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

                            }

                        }
                    });

                }

            };

            return objectNotificationFormFactory;
        }

    ])
;
