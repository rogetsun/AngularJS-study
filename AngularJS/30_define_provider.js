/**
 * Created by uv2sun on 15/7/13.
 */

angular.module('util.state', ['ui.router'])
    /**
     * 名字是不带provider的，但是在config()里注入时，自动在最后加上provider，变为stateServiceProvider
     */
    .provider('stateService',
    /**
     * 此处只能注入别的service的provider
     */
    [function () {
        var StateConf = function (stateName, stateUrl, data) {
            this.stateName = stateName;
            this.stateUrl = stateUrl;
            this.data = data;
        };

        StateConf.prototype.getConf = function () {
            return this;
        };

        return {
            /**
             * 可被注入到config的provider访问使用
             */
            key: '_STATE_CONF',
            /**
             * 可被注入到config的provider访问使用
             * @param stateName
             * @param stateUrl
             * @param data
             * @returns {StateConf}
             */
            conf: function (stateName, stateUrl, data) {
                return new StateConf(stateName, stateUrl, data);
            },
            /***
             * 在生成stateService服务时angular使用。
             * 服务stateService拥有属性方法为$get对应function返回的内容。
             * 同时在$get的function内部可通过this访问上面的key和conf。
             * 注意这里写在this上的属性方法不会赋给服务。
             * 只看返回值。和service定义服务有区别。
             * 因此如果$get反回this，将把stateServiceProvider用的key，conf暴露给stateService
             * 所以一般用方式1.
             *
             * @returns {stateService}
             */
            $get: function () {
                //方式1：
                /***
                 * 这里的this可访问上面暴露给provider的key、conf
                 */
                var _this = this;
                return {
                    getConf: function (stateConf) {
                        //
                        console.log("$get:%s", _this.key);
                        return stateConf && stateConf.getConf();
                    }
                };
                //方式2：
                //this.getConf = function (stateConf) {
                //    console.log(this.key);
                //    return stateConf && stateConf.getConf();
                //};
                //return this;
            }
        }
    }])
    .service('stateTreeService', ['stateService', function (stateService) {

        function StateTree($state, rootStateName) {
            this.$state = $state;
            this.rootStateName = rootStateName;
        }

        StateTree.prototype.state2tree = function () {
            /**
             * 这里访问stateService暴露的方法getConf
             */
            console.log(stateService.getConf());
        };


        return {
            init: function ($state, rootStateName) {
                this._stateTree = new StateTree($state, rootStateName);
                this.stateTree = this._stateTree.state2tree();
            },
            getStateTree: function () {
                return this.stateTree;
            },
            getRootStateName: function () {
                return this._stateTree.rootStateName;
            }
        };
    }]);
