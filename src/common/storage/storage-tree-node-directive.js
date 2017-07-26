angular.module('storage.storageTreeNodeDirective', [])
    .directive('cbStorageTreeNode', ['$state', '$timeout',

        function ($state, $timeout) {

            return {

                restrict: 'A',
                require: ['uiTreeNode', 'ngModel'],
                scope: {},
                link: function ($scope, element, attrs, ctrls) {

                    $scope.uiTreeNode = ctrls[0].scope;
                    $scope.modelCtrl = ctrls[1];
                    $scope.model = $scope.uiTreeNode.$modelValue;
                    $scope.uiTreeNode.active = false;

                    if ($scope.model.id === 1) {
                        element.find('ol').css({'padding-left': 0});
                    }

                    if ($scope.model.id == $state.params.id) {

                        $scope.uiTreeNode.active = true;

                        var whileScope = $scope.uiTreeNode.$parent;
                        while (whileScope) {
                            try {
                                whileScope.expand();
                                whileScope = whileScope.$parent;
                            } catch (err) {
                                whileScope = false;
                            }
                        }

                    }

                }

            };

        }

    ])
;
