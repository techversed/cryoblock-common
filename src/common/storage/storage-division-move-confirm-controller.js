angular.module('storage.storageDivisionMoveConfirmCtrl', [])

    .controller('storageDivisionMoveConfirmCtrl', ['$scope', 'dropEvent', '$cbResource', 'toastr', '$state',

        function ($scope, dropEvent, $cbResource, toastr, $state) {

            $scope.dropEvent = dropEvent;

            $scope.sourceDivision = $scope.dropEvent.source.nodeScope.$modelValue;
            $scope.fromDivision = $scope.dropEvent.source.nodesScope.$parent.$modelValue;
            $scope.toDivision = $scope.dropEvent.dest.nodesScope.$parent.$modelValue;
            $scope.fromIndex = $scope.dropEvent.source.index;
            $scope.toIndex = $scope.dropEvent.dest.index;

            $scope.sourceDivisionTitle = $scope.sourceDivision.title;
            $scope.fromDivisionTitle = $scope.fromDivision ? $scope.fromDivision.title : 'Root';
            $scope.toDivisionTitle = $scope.toDivision ? $scope.toDivision.title : 'Root';

            $scope.confirm = function () {

                if ($scope.toDivision) {
                    $scope.sourceDivision.parent = {id: $scope.toDivision.id}
                }

                replaceDivision = $scope.dropEvent.dest.nodesScope.$modelValue[$scope.toIndex];

                if (replaceDivision) {
                    hash = replaceDivision.$$hashKey

                    if ($scope.fromDivision && $scope.toDivision && $scope.fromDivision.id === $scope.toDivision.id && $scope.toIndex > $scope.fromIndex) {
                        data = {'nextSiblingOf': replaceDivision.id};
                    } else {
                        data = {'previousSiblingOf': replaceDivision.id};
                    }

                }
                else {
                    var sibling = $scope.dropEvent.dest.nodesScope.$modelValue[$scope.toIndex - 1];
                    var destLength = $scope.dropEvent.dest.nodesScope.$modelValue.length
                    if (sibling && $scope.toIndex == destLength) {
                        data = {'lastChildOf': $scope.toDivision.id};
                    } else if (sibling) {
                        data = {'nextSiblingOf': sibling.id};
                    } else {
                        data = {'firstChildOf': $scope.toDivision.id};
                    }
                }

                $cbResource.create('/storage/division/' + $scope.sourceDivision.id + '/move', data).then(
                    function (response) {
                        toastr.info('Division moved successfully');
                        $scope.$close();
                    },
                    function (response) {
                        $scope.$dismiss();
                    }
                );

            };

        }

    ])
;
