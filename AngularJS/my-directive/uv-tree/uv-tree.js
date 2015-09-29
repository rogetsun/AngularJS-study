angular.module('uv.directive.tree', [])
    .directive('uvTree', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                uvTreeData: '=',
                uvTreeNodeId: '@',
                uvTreeNodeParentId: '@',
                uvTreeNodeName: '@',
                uvTreeMultiSelect: '@',
                uvTreeSelectNodeFunc: '&'
            },
            link: function ($scope, elem, attr) {
                window.funcTree = new dTree('funcTree', '/static/assets/uv-tree/img');
                funcTree.config.multiSelect = !!$scope.uvTreeMultiSelect;
                funcTree.config.check = !!$scope.uvTreeMultiSelect;
                funcTree.config.useIcons = false;
                var id = $scope.uvTreeNodeId, pid = $scope.uvTreeNodeParentId, name = $scope.uvTreeNodeName;

                angular.forEach($scope.uvTreeData, function (v) {
                    funcTree.add(v[id], v[pid], v[name], '', '', v.selected, v, true);
                });
                var treeHtml = funcTree.toString();
                console.log(treeHtml);
                elem.html(treeHtml);

            }
        }
    }]);