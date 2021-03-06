angular.module('storage.storageDivisionFormCtrl', [])

    .controller('storageDivisionFormCtrl', ['$scope', 'division', 'sampleTypeGrids', 'storageContainerGrids', '$uibModalInstance', '$cbResource', 'toastr', 'callback', 'divisionEditorGrids', 'divisionViewerGrids', 'sessionFactory', 'divisionGroupEditorGrids', 'divisionGroupViewerGrids', 'storageDivisionManager',

        function ($scope, division, sampleTypeGrids, storageContainerGrids, $modalInstance, $cbResource, toastr, callback, divisionEditorGrids, divisionViewerGrids, sessionFactory, divisionGroupEditorGrids, divisionGroupViewerGrids, storageDivisionManager) {

            $scope.errors = [];
            $scope.divisionForm = {};

            $scope.division = division ? angular.copy(division) : {
                allowAllSampleTypes: true,
                allowAllStorageContainers: true,
                hasDimension: true,
                isPublicEdit: false,
                isPublicView: true,
                parent:{id:1}
            };

            if ($scope.division.id == undefined) {
                divisionEditorGrids[1].addingItems.push(sessionFactory.getLoggedInUser());
                divisionEditorGrids[1].addingItemIds.push(sessionFactory.getLoggedInUser().id);
            }

            $scope.sampleTypeGrids = sampleTypeGrids;
            $scope.storageContainerGrids = storageContainerGrids;
            $scope.divisionEditorGrids = divisionEditorGrids;
            $scope.divisionViewerGrids = divisionViewerGrids;
            $scope.divisionGroupViewerGrids = divisionGroupViewerGrids;
            $scope.divisionGroupEditorGrids = divisionGroupEditorGrids ;

            $scope.propagationBehaviors = ['Default - Only change the selected division', 'Cascade - Add the changes to the children', 'Trample - overwrite child permissions with current changes'];
            $scope.division.propagationBehavior = $scope.propagationBehaviors[0];

            $scope.oldPublicEditValue = $scope.division.isPublicEdit;
            $scope.oldPublicViewValue = $scope.division.isPublicView;
            $scope.oldAllStorage = $scope.division.allowAllStorageContainers;
            $scope.oldAllSample = $scope.division.allowAllSampleTypes;

            // If cascade is true then then division listener on the bakckend will grab the request and cascade all insertions and deletiosn to the children of the node
            // If casecade is false then the division listener will trample the settings of the previous division with the new settings.
            $scope.division.cascade = true;

            if ($scope.division.parentId) {
                $scope.division.parent = {id: $scope.division.parentId};
            }

            $scope.acceptedHeights = [];
            for (var i = 1; i <= 30; i++) {
                $scope.acceptedHeights.push(i);
            }

            $scope.acceptedWidths = [];
            for (var i = 1; i <= 30; i++) {
                $scope.acceptedWidths.push(i);
            }

            $scope.close = function () {

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                $scope.permissionsChanged = false;

                //Old method of assessing change was not strict enough --
                //if($scope.divison.editors !== undefined || $scope.division.groupEditors !== undefined || $scope.division.viewers !== undefined || $scope.division.groupViewers !== undefined || $scope.division.sampleTypes !== undefined || $scope.division.storageContainers !== undefined))
                if ($scope.division.editors ? ($scope.division.editors['adding'].length != 0 || $scope.division.editors['removing'].length != 0 ) : false
                    || $scope.division.groupEditors ? ($scope.division.groupEditors['adding'].length != 0 || $scope.division.groupEditors['removing'].length != 0) : false
                    || $scope.division.viewers ? ($scope.division.viewers['adding'].length != 0 || $scope.division.viewers['removing'].length != 0) : false
                    || $scope.division.groupViewers ? ($scope.division.groupViewers['adding'].length != 0 || $scope.division.groupViewers['removing'].length != 0) : false
                    || $scope.division.sampleTypes ? ($scope.division.sampleTypes['adding'].length != 0 || $scope.division.sampleTypes['removing'].length != 0) : false
                    || $scope.division.storageContainers ? ($scope.division.storageContainers['adding'].length != 0 || $scope.division.storageContainers['removing'].length != 0) : false)
                {
                    $scope.permissionsChanged = true;
                }

                if ($scope.division.id !== undefined && ($scope.oldPublicViewValue !== $scope.division.isPublicView || $scope.oldPublicEditValue !== $scope.division.isPublicEdit || $scope.oldAllSample !== $scope.division.allowAllSampleTypes || $scope.oldAllStorage !== $scope.division.allowAllStorageContainers)) {
                    $scope.permissionsChanged = true;
                }

                if ($scope.permissionsChanged) {

                    swal({
                        title: "Are you sure?",
                        text: "You are changing the permissions/sample types/containers of this division. All children settings within this division will be overridden.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    }, function() {
                        $scope.save();
                    });

                } else {

                    $scope.save();

                }

            }

            $scope.save = function () {

                var method = $scope.division.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/storage/division?id[EQ]=' + $scope.division.id
                    : '/storage/division'
                ;

                $cbResource[method](url, $scope.division).then(

                    function (response) {

                        toastr.info('Division ' + method + 'd successfully');
                        $scope.close();
                        storageDivisionManager.navigationState = storageDivisionManager.navigationStates[0];
                        callback();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            }

        }

    ])
;
