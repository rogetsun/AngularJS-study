/**
 * 基于dtree的angularjs版tree
 *
 * 注意一级节点的父节点ID要为-1
 *
 * example：
 * <div class="tree" uv-tree="funcs" uv-tree-data="funcs" uv-tree-node-id-key="func_code"
 * uv-tree-node-parent-id-key="par_func_code" uv-tree-node-name-key="func_name" uv-tree-node-selected-key="selected"
 * uv-tree-multi-select="true">
 * </div>
 *
 *
 */
angular.module('uv.directive.tree', [])
    .provider('uvTreeConfig', [function () {
        var imgFolder = "./img";
        return {
            setImgFolder: function (imgFolderPath) {
                imgFolder = imgFolderPath;
            },
            $get: function () {
                return {
                    imgFolder: imgFolder
                }
            }
        }
    }])
    .directive('uvTree', ['$timeout', 'uvTreeConfig', function ($timeout, uvTreeConfig) {
        return {
            restrict: 'A',
            template: '<div></div>',
            scope: {
                uvTreeData: '=',            //tree的源数据
                uvTreeNodeIdKey: '@',       //tree节点的json对象中表示id的key
                uvTreeNodeParentIdKey: '@', //tree节点的json对象中表示父节点ID的key
                uvTreeNodeNameKey: '@',     //tree节点的json对象中表示名称的key
                uvTreeNodeSelectedKey: '@', //tree节点的json对象中表示当前节点应该已被默认选中的key
                uvTreeMultiSelect: '@',     //tree是否支持多选，现在单选有点问题,20160615解决
                uvTreeSelectNodeFunc: '@'   //click某个节点时,调用的func。一个入参:节点数据对象
            },
            link: function ($scope, elem, attr) {
                $scope.$watch('uvTreeData', function (v) {
                    if (v) {
                        var treeScopeName = attr.uvTree || ("_tree" + parseInt(Math.random() * 100));
                        var selectNodeFn;
                        if ($scope.uvTreeSelectNodeFunc) {
                            selectNodeFn = $scope.$parent[$scope.uvTreeSelectNodeFunc.split('(')[0]];
                        }
                        window[treeScopeName] = new dTree(treeScopeName, uvTreeConfig.imgFolder);
                        $scope.$parent[treeScopeName] = window[treeScopeName];
                        window[treeScopeName].config.multiSelect = !!$scope.uvTreeMultiSelect;
                        window[treeScopeName].config.checkbox = !!$scope.uvTreeMultiSelect;
                        window[treeScopeName].config.useIcons = false;
                        var id = $scope.uvTreeNodeIdKey,
                            pid = $scope.uvTreeNodeParentIdKey,
                            name = $scope.uvTreeNodeNameKey,
                            selectKey = $scope.uvTreeNodeSelectedKey;

                        window._selectNode = function (id) {
                            if (selectNodeFn) {
                                selectNodeFn($scope.treeJSON[id]);
                            }
                        };

                        $scope.treeJSON = {};
                        angular.forEach($scope.uvTreeData, function (v) {
                            $scope.treeJSON[v[id]] = v;
                            window[treeScopeName].add(v[id], v[pid], v[name], 'javascript:_selectNode(' + v[id] + ');', '', v[selectKey], v, false);
                        });
                        var treeHtml = window[treeScopeName].toString();
                        elem.html(treeHtml);
                    }

                }, true);
            }
        }
    }]);