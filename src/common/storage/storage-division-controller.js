angular.module('storage.storageDivisionCtrl', [])
    .controller('storageDivisionCtrl', ['$scope', 'division',  '$window', '$timeout', 'storageFormFactory', 'storageDivisionManager', 'divisionGrid', 'sessionFactory',
        function ($scope, division, $window, $timeout, storageFormFactory, storageDivisionManager, divisionGrid, sessionFactory) {

            $scope.division = division;

            $scope.inventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');

            $scope.sdm = storageDivisionManager;
            $scope.sdm.initialize($scope.division);
            $scope.editSelectedSample = $scope.sdm.editSelectedSample;

            $scope.grid =  divisionGrid;

            $scope.zoom = {
                percentage: 75
            };

            $scope.currentView = $scope.division.hasDimension ? 'grid' : 'list';
            $scope.changeView = function (view) {
                $scope.currentView = view;
            };

            $scope.radioModel = "Left";


            $scope.zoomIn = function () {
                if ($scope.zoom.percentage === 150) {
                    return;
                }
                $scope.zoom.percentage = $scope.zoom.percentage + 25;
            };

            $scope.zoomOut = function () {
                if ($scope.zoom.percentage === 25) {
                    return;
                }
                $scope.zoom.percentage = $scope.zoom.percentage - 25;
            };

            $scope.$watch('zoom.percentage', function (v) {

                $scope.$broadcast('storage_box.resize', {percentage: v});

            });

            $scope.rows = [];
            $scope.columns = [];

            for (var i = 1; i <= division.width; i++) {
                $scope.columns.push(i);
            }

            for (var i = 65; i < division.height + 65; i++) {
                $scope.rows.push(String.fromCharCode(i));
            }

            var onWindowResize = function () {

                $scope.$broadcast('storage_box.resize', {percentage: $scope.zoom.percentage});

            };

            angular.element($window).on('resize', onWindowResize);

            $scope.$on('$destroy', function () {

                angular.element($window).off('resize', onWindowResize);

            });

            $scope.$on('storage_box.well_selected', function (event, data) {

                $scope.$broadcast('storage_box.details.well_selected', data);

            });

            if ($scope.division.samples.length !== 0) {
                var selectedSample = $scope.division.samples[0];
            }

            $scope.breadcrumbs = [];
            var whileScope = $scope.division.parent;
            while (whileScope) {
                try {
                    $scope.breadcrumbs.push(whileScope);
                    whileScope = whileScope.parent;
                } catch (err) {
                    whileScope = false;
                }
            }
            $scope.breadcrumbs.reverse();

        }

    ])
;
