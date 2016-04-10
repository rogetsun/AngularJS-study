/**
 * Created by uv2sun on 16/3/11.
 */
angular.module('uv.directive.click', [])
    .directive('ngClick', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                console.log('compile div');
                $element.off('click');
                var fn = $parse(attr['uvClick']);
                return function ngEventHandler(scope, element) {
                    element.on('click', function (event) {
                        var callback = function () {
                            console.log('diy directive');
                            if (!!attr['viewCtrl']) {
                                fn(scope, {$event: event});
                            } else {
                                window.alert("未知按钮");
                            }
                        };
                        scope.$apply(callback);
                    });
                };
            }
        };
    }]);
