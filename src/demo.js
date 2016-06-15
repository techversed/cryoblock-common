var cryblock = angular.module('cryoblockApp', [
    'ui.router',
    'ui.bootstrap',
    'templates',
    'common',
    // 'carbonAppDirectives',
    'ngStorage',
    'carbonConfig',
    'toastr',
    'angular-loading-bar',
    'ngCookies',
    'form',
    'button',
    'ngImgCrop',
    'blueimp.fileupload',
    'datatables',
    'ngMessages',
    'treeControl',
    'ui-rangeSlider',
    'fiestah.money',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.tabs'
]);

angular.module('cryoblockApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
