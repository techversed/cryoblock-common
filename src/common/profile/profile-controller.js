angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$localStorage', '$uibModal', 'user', 'API', 'profileFormFactory', 'grid',

        function ($scope, $localStorage, $modal, user, API, profileFormFactory, grid) {

            $scope.user = user;
            $scope.grid = grid;

            var lookup = {
                'AppBundle\\Entity\\Production\\Pbmc\\Request': 'pbmc',
                'AppBundle\\Entity\\Production\\HumanSpecimen\\Request': 'human_specimen',
                'AppBundle\\Entity\\SEEQ\\Run': 'seeq_run',
                'AppBundle\\Entity\\Storage\\Sample': 'sample',
                'AppBundle\\Entity\\Production\\ProteinExpression\\Request': 'protein_expression',
                'AppBundle\\Entity\\Production\\ProteinPurification\\Request': 'protein_purification',
                'AppBundle\\Entity\\SEEQ\\Pipeline': 'seeq_pipeline',
                'AppBundle\\Entity\\Production\\Dna\\Request': 'dna',
                'AppBundle\\Entity\\Record\\Vim': 'vim',
                'AppBundle\\Entity\\Record\\Travel': 'travel',
                'AppBundle\\Entity\\People\\Institution': 'people_institution',
                'AppBundle\\Entity\\People\\Contact': 'people_contact',
                'AppBundle\\Entity\\People\\Company': 'people_company',
                'AppBundle\\Entity\\Equipment\\Equipment': 'equipment',
                'AppBundle\\Entity\\Storage\\SampleType': 'sample_type',
                'AppBundle\\Entity\\Storage\\Catalog': 'catalog',
                'AppBundle\\Entity\\Storage\\Tag': 'tag',
                'AppBundle\\Entity\\People\\Collaboration': 'people_collaboration',
                'AppBundle\\Entity\\Record\\Mta': 'mta',
                'AppBundle\\Entity\\Storage\\Division': 'storage.divison',
                'AppBundle\\Entity\\Record\\Grant': 'grant',
                'AppBundle\\Entity\\Project\\Project': 'project',
                'Carbon\\ApiBundle\\Entity\\User': 'admin.user',
                'AppBundle\\Entity\\Record\\Report': 'report',
                'AppBundle\\Entity\\Record\\Cda': 'cda',
                'AppBundle\\Entity\\Donor\\Donor': 'donor'

            }


            var appName = {
                'AppBundle\\Entity\\Production\\Pbmc\\Request': 'PBMC',
                'AppBundle\\Entity\\Production\\HumanSpecimen\\Request': 'Human Specimen',
                'AppBundle\\Entity\\SEEQ\\Run': 'Seeq Run',
                'AppBundle\\Entity\\Storage\\Sample': 'Sample',
                'AppBundle\\Entity\\Production\\ProteinExpression\\Request': 'Protein Expression',
                'AppBundle\\Entity\\Production\\ProteinPurification\\Request': 'Protein Purification',
                'AppBundle\\Entity\\SEEQ\\Pipeline': 'Seeq Pipeline',
                'AppBundle\\Entity\\Production\\Dna\\Request': 'DNA',
                'AppBundle\\Entity\\Record\\Vim': 'VIM',
                'AppBundle\\Entity\\Record\\Travel': 'Travel',
                'AppBundle\\Entity\\People\\Institution': 'Institution',
                'AppBundle\\Entity\\People\\Contact': 'Contact',
                'AppBundle\\Entity\\People\\Company': 'Company',
                'AppBundle\\Entity\\Equipment\\Equipment': 'Equipment',
                'AppBundle\\Entity\\Storage\\SampleType': 'Sample Type',
                'AppBundle\\Entity\\Storage\\Catalog': 'Catalog',
                'AppBundle\\Entity\\Storage\\Tag': 'Tag',
                'AppBundle\\Entity\\People\\Collaboration': 'Collaboration',
                'AppBundle\\Entity\\Record\\Mta': 'MTA',
                'AppBundle\\Entity\\Storage\\Division': 'Divison',
                'AppBundle\\Entity\\Record\\Grant': 'Grant',
                'AppBundle\\Entity\\Project\\Project': 'Project',
                'Carbon\\ApiBundle\\Entity\\User': 'User',
                'AppBundle\\Entity\\Record\\Report': 'Report',
                'AppBundle\\Entity\\Record\\Cda': 'CDA',
                'AppBundle\\Entity\\Donor\\Donor': 'Donor'

            }
            $scope.$watch(function() {return $scope.grid.pagination}, function(){

                angular.forEach(grid.results, function(result) {

                    result.object = lookup[result.objectClass];
                    result.objectName = appName[result.objectClass];

                    var tmp =  result.objectClass.split('\\');

                    if (tmp[tmp.length-1] == "Request"){
                        result.objectClass = tmp[tmp.length-2] + " " + tmp[tmp.length-1];
                    }
                    else{
                        result.objectClass =tmp[tmp.length-1];
                    }
                });

            });

            $scope.edit = profileFormFactory.openFormModal;

            $scope.hasAvatar = function () {
                return typeof $scope.user.avatar_attachment !== 'undefined';
            }

            $scope.avatarSrc = $scope.hasAvatar()
                ? API.url + '/attachment/' + $scope.user.avatar_attachment.id + '/download'
                : null
            ;

            $scope.uploadPhoto = function () {
                $modal.open({
                    templateUrl: 'common/profile/partials/profile-photo-upload-tpl.html',
                    controller: 'photoUploadCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static'
                });
            }

            $scope.changePassword = function () {
                $modal.open({
                    templateUrl: 'common/profile/profile-change-password-tpl.html',
                    controller: 'changePasswordCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    resolve: {

                        user: function () {

                            return $scope.user;

                        }

                    }
                });
            }
        }

    ])
;
