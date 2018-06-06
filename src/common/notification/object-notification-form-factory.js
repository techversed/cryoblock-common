angular.module('notification.objectNotificationFormFactory', [])

    .factory('objectNotificationFormFactory', ['$uibModal', '$cbResource', 'sessionFactory', '$cbGridBuilder', '$q',

        function ($uibModal, $cbResource, sessionFactory, $cbGridBuilder, $q) {

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

                            entityDetail: function () {
                                var data = {
                                    'objectClassName[EQ]': entity
                                };
                                return $cbResource.getOne('/cryoblock/entity-detail', data).then(function(response){
                                    if (response == undefined) {
                                        return $cbResource.create('/cryoblock/entity-detail', {'objectClassName': entity, 'objectUrl': url, 'objectDescription': objectDescription}).then( function (ed){
                                            return ed.data;
                                        });
                                    }
                                    else{
                                        return response;
                                    }
                                });
                            },

                            groupObjectNotification: function () {

                                return $cbResource.getOne('/cryoblock/entity-detail',{'objectClassName[EQ]': entity}).then( function (response) {
                                    if (response == undefined){
                                        return response;
                                    }
                                    else {
                                        return $cbResource.getOne('/cryoblock/group-object-notification', {'entityDetailId[EQ]': response.id});
                                    }
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

                            entity: function () { // I don't know if this will be needed in the controller... my prediction is not.

                                return entity;

                            },

                            objectDescription: function () { // this will no longer be needed by the controller since we are handling this here.

                                return objectDescription;

                            },

                            //This is no longer needed...
                            url: function () { // this will no longer be needed here since we are populating the entity table here.

                                return url;

                            },

                            entityDetail: function () {
                                var data = {
                                    'objectClassName[EQ]': entity
                                };
                                return $cbResource.getOne('/cryoblock/entity-detail', data).then(function(response){
                                    if (response ==undefined) {
                                        return $cbResource.create('/cryoblock/entity-detail', {'objectClassName': entity, 'objectUrl': url, 'objectDescription': objectDescription}).then( function (ed){
                                            return ed.data;
                                        });
                                    }

                                });
                            },

                            userObjectNotification: function () {

                                var loggedInUser = sessionFactory.getLoggedInUser();

                                var data = {
                                    'objectClassName[EQ]': entity
                                };
                                return $cbResource.getOne('/cryoblock/entity-detail', data, true).then( function (response) {
                                    if (response == undefined){
                                        return response;
                                    }
                                    else {

                                        data={
                                            'entityDetailId[EQ]': response.id,
                                            'userId[EQ]': loggedInUser.id,
                                            'entityId[NULL]': true
                                        }

                                        return $cbResource.getOne('/cryoblock/user-object-notification', data);

                                    }

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
