/**
 * Created by uv2sun on 15/12/31.
 * 依赖:
 *      bootstrap-datetimepicker.
 *      https://github.com/smalot/bootstrap-datetimepicker
 *
 *      注意:该插件在页面缩小存在滚动时,弹出选择日期框定位有问题.
 *
 *  uv-time-picker 或 uv-date-time-picker ="timestamp" 或者没有值时,
 *      ng-model获得的值为毫秒timestamp
 *
 */
angular.module('uv.directive.datetimepicker', [])
    .directive('uvTimePicker', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                /**
                 * 显示在input的日期时间格式
                 * @type {string}
                 */
                var format = 'hh:ii';

                element.datetimepicker({
                    language: 'zh-CN',
                    startView: 1,
                    autoclose: true,
                    format: format,
                    showMeridian: true
                }).on('changeDate', function (e) {
                    ngModelCtrl.$setViewValue(e.date.getTime());
                    scope.$apply();
                });
                /**
                 * scope中ngModel绑定的数据timestamp值
                 */
                var initTimestamp = scope[attrs.ngModel];
                if (initTimestamp) {
                    /**
                     * 生成ngModel绑定的值对应的Date对象
                     * @type {Date}
                     */
                    var initDate = new Date();
                    initDate.setTime(initTimestamp);
                    /**
                     * 在angular完成所有操作后,按上面datetimepicker配置的规则更新显示和数据
                     */
                    $timeout(function () {
                        element.datetimepicker('update', initDate);
                    });
                }

            }
        };
    }])
    .directive('uvDateTimePicker', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl)return;
                /**
                 * 显示在input的日期时间格式
                 * @type {string}
                 */
                var format = 'yyyy-mm-dd hh:ii';

                /**
                 * 配置bootstrap-datetimepicker
                 */
                element.datetimepicker({
                    language: 'zh-CN',
                    format: format,
                    autoclose: true,
                    showMeridian: true,
                    //initialDate: initDateStr,//怀疑因为angular导致element.val()数据又被覆盖
                    todayHighlight: true
                }).on('changeDate', function (e) {
                    ngModelCtrl.$setViewValue(e.date.getTime());
                    scope.$apply();
                });

                /**
                 * scope中ngModel绑定的数据timestamp值
                 */
                var initTimestamp = scope[attrs.ngModel];
                if (initTimestamp) {
                    /**
                     * 生成ngModel绑定的值对应的Date对象
                     * @type {Date}
                     */
                    var initDate = new Date();
                    initDate.setTime(initTimestamp);
                    /**
                     * 在angular完成所有操作后,按上面datetimepicker配置的规则更新显示和数据
                     */
                    $timeout(function () {
                        element.datetimepicker('update', initDate);
                    });
                }


            }
        };
    }]);


