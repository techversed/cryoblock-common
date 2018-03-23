angular.module('form.cbFormHelperService', [])

    .service('cbFormHelper', ['$state', '$stateParams', 'toastr', '$cbResource',

        function ($state, $stateParams, toastr, $cbResource) {

            var cbFormHelper = {

                openForm: function (method, objectDescription, objectId, url, returnState) {

                    swal({
                        title: "Are you sure?",
                        text: "You are about to " + method + " " + objectDescription + " Id#" +  objectId.toString(),
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    }, function() {

                        returnState = returnState == undefined ? $state.current : returnState;

                        $cbResource[method](url, {'id[EQ]': objectId}).then(function (response) {
                            $state.go(returnState, $stateParams, {reload:true});
                            toastr.success(objectDescription + " " + method + 'd successfully');
                        });
                    });
                }
            };

            return cbFormHelper;
        }

    ])
;
