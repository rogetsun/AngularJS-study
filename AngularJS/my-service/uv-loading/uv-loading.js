/**
 * Created by uv2sun on 15/2/15.
 * this depend jQuery
 *
 *
 *
 app.run(['$rootScope', 'uvLoading', function ($rootScope, ul) {
                $rootScope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            ul.loading();
                        });
                $rootScope.$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            ul.unloading();
                        })
            }]);
 */
angular.module('uv.service.loading', [])
    .run(['$templateCache', '$rootScope', 'uvLoading', function ($templateCache, $rootScope, uvLoading) {
        $rootScope._uv_loading = {show: false};
        $templateCache.put(
            'uv-loading.html',
            '<div ng-show="_uv_loading.show" style="z-index: 9999999998;">' +
            '<div' +
            '   style="z-index: 9999999999;' +
            '       position: fixed;' +
            '       top:50%;' +
            '       left:50%;' +
            '       height:110px;' +
            '       margin-top: -55px;' +
            '       width:114px;' +
            '       background-color:#000;' +
            '       color:#f2f2f2;' +
            '       margin-left: -57px;' +
            '       border-radius:6px;' +
            '       padding: 5px;' +
            '   ">' +
            '<img src="loading.gif">' +
            '</div>' +
            '<div style="position: fixed;top:0;left:0;width:100%;height:100%;background-color: transparent;"></div>' +
            '</div>'
        );
        angular.element($templateCache.get('uv-loading.html')).appendTo(angular.element('body'));
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                uvLoading.loading();
            });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                uvLoading.unloading();
            });
    }])
    .service('uvLoading', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var timer;
        return {
            loading: function (minisecond) {
                $rootScope._uv_loading.show = true;
                if (minisecond) {
                    var _this = this;
                    timer = $timeout(function () {
                        _this.unloading();
                    }, minisecond);
                }
            },
            unloading: function () {
                $rootScope._uv_loading.show = false;
            }
        }
    }]);