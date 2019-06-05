angular.module('storage.storageDivisionSearchCtrl', [])
/*

    We really need to separate the search view from the regular division view because it is making it so that the grid results need to be loaded every time a user requests a division page.


*/

    .controller('storageDivisionSearchCtrl', ['$scope', 'division', '$window', 'divisionGrid', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q', 'storageFactory', 'storageDivisionManager', '$stateParams',

        function ($scope, division, $window, divisionGrid, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q, storageFactory, storageDivisionManager, $stateParams) {

            console.log("made it into the search controller");

            $scope.grid =  divisionGrid;
            $scope.inventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');
            $scope.sdm = storageDivisionManager;
            // $scope.sdm.toggleSearch = false;
            $scope.sdm.toggleSearch = true;


            // $scope.sdm = storageDivisionManager;
            // $scope.sdm.initialize($scope.division);
            // $scope.editSelectedSample = $scope.sdm.editSelectedSample;


            // $scope.sdm = storageDivisionManager;

            // $scope.grid = divisionGrid;


            // $scope.goToDivision = function (division) {
            //     $state.go('storage.division', {id:division.id});
            // };


            // $scope.isInventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');

            // $scope.$on('$destroy', function () {
            //     $scope.sdm.navigationState = $scope.sdm.navigationStates[0];
            // });

            // if ($stateParams.selectedSampleId) {
                // console.log("scope.testing", $scope.testing);
                // storageDivisionManager.initSampleId = $stateParams.selectedSampleId;
            // }

            // $scope.division = division;




            // $scope.zoom = {
            //     percentage: 75
            // };

            // $scope.currentView = $scope.division.hasDimension ? 'grid' : 'list'; // We should really do this in the sdm instead...
            // $scope.changeView = function (view) {
                // $scope.currentView = view;
                // console.log($scope.currentView);
            // };

            // $scope.radioModel = "Left";

            // $scope.zoomIn = function () {
                // if ($scope.zoom.percentage === 150) {
                    // return;
                // }
                // $scope.zoom.percentage = $scope.zoom.percentage + 25;
            // };

            // $scope.zoomOut = function () {
                // if ($scope.zoom.percentage === 25) {
                    // return;
                // }
                // $scope.zoom.percentage = $scope.zoom.percentage - 25;
            // };

            // $scope.$watch('zoom.percentage', function (v) {

            //     $scope.$broadcast('storage_box.resize', {percentage: v});

            // });

            // $scope.rows = [];
            // $scope.columns = [];

            // for (var i = 1; i <= division.width; i++) {
            //     $scope.columns.push(i);
            // }

            // for (var i = 65; i < division.height + 65; i++) {
            //     $scope.rows.push(String.fromCharCode(i));
            // }

            // var onWindowResize = function () {

            //     $scope.$broadcast('storage_box.resize', {percentage: $scope.zoom.percentage});

            // };

            // angular.element($window).on('resize', onWindowResize);

            // $scope.$on('$destroy', function () {

            //     angular.element($window).off('resize', onWindowResize);

            // });

            // $scope.$on('storage_box.well_selected', function (event, data) {

            //     $scope.$broadcast('storage_box.details.well_selected', data);

            // });

            // if ($scope.division.samples.length !== 0) {
                // var selectedSample = $scope.division.samples[0];
            // }

            // $scope.breadcrumbs = [];
            // var whileScope = $scope.division.parent;
            // while (whileScope) {
            //     try {
            //         $scope.breadcrumbs.push(whileScope);
            //         whileScope = whileScope.parent;
            //     } catch (err) {
            //         whileScope = false;
            //     }
            // }
            // $scope.breadcrumbs.reverse();

        }

    ])
;
