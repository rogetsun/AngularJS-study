angular.module('uv.directive.tree', [])
    .directive('uvTree', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                uvTreeData: '=',
                uvTreeNodeIdKey: '@',
                uvTreeNodeParentIdKey: '@',
                uvTreeNodeNameKey: '@',
                uvTreeNodeSelectedKey: '@',
                uvTreeMultiSelect: '@',
                uvTreeSelectNodeFunc: '&'
            },
            link: function ($scope, elem) {
                window.funcTree = new dTree('funcTree', '/static/assets/uv-tree/img');
                funcTree.config.multiSelect = !!$scope.uvTreeMultiSelect;
                funcTree.config.checkbox = !!$scope.uvTreeMultiSelect;
                funcTree.config.useIcons = false;
                var id = $scope.uvTreeNodeIdKey,
                    pid = $scope.uvTreeNodeParentIdKey,
                    name = $scope.uvTreeNodeNameKey,
                    selectKey = $scope.uvTreeNodeSelectedKey;

                angular.forEach($scope.uvTreeData, function (v) {
                    funcTree.add(v[id], v[pid], v[name], '', '', v[selectKey], v, true);
                });
                var treeHtml = funcTree.toString();
                elem.html(treeHtml);

            }
        }
    }]);