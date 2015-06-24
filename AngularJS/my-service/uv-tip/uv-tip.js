/**
 * Created by uv2sun on 15/3/16.
 * uvTip服务：
 *      showTip(content, minisecond)：
 *          @param content 现实内容，可以html代码
 *          @param minisecond 多少毫秒以后自动小时
 *
 *      hideTip：
 *          隐藏提示
 */
angular.module('uv.service.tip', [])
    .run(['$templateCache', '$rootScope', function ($templateCache, $rootScope) {
        $rootScope._uv_tip = {show: false};
        $templateCache.put(
            'uv-tip.html',
            '<div ng-show="_uv_tip.show" style="top:0;left:0;position: fixed;width:100%;height: 100%;background-color: rgba(0,0,0,0.5)">' +
            '<div id="_uv_tip_father" style="top:50%;margin-top: -55px;position: relative;">' +
            '<div id="_uv_tip" class="_uv_tip" style="margin:auto;color: #f2f2f2;background-color: #000;position: relative;max-width: 80%;min-width: 50%;width:50%;-moz-border-radius: 6px;-webkit-border-radius: 6px;border-radius: 6px;padding:10px;text-align: center;">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        $rootScope._uv_tip.rootElement = angular.element($templateCache.get('uv-tip.html'));
        $rootScope._uv_tip.contentElement = $rootScope._uv_tip.rootElement.children("#_uv_tip_father").children("#_uv_tip");
        $rootScope._uv_tip.rootElement.appendTo(angular.element('body'));
        console.log($rootScope._uv_tip.contentElement.html());
    }])
    .service('uvTip', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var timer;
        return {
            /**
             *
             * @param content 现实内容，可以html代码
             * @param minisecond 多少毫秒以后自动小时
             */
            showTip: function (content, minisecond) {
                $rootScope._uv_tip.contentElement.html(content);
                $rootScope._uv_tip.show = true;
                if (minisecond) {
                    var _this = this;
                    timer = $timeout(function () {
                        _this.hideTip();
                    }, minisecond);
                }
            },
            /**
             * 隐藏提示
             */
            hideTip: function () {
                $rootScope._uv_tip.show = false;
            }
        }
    }]);
