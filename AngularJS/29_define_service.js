/**
 * Created by uv2sun on 15/1/9.
 * service定义服务时，可以直接this.xxxx定义，也可以return一个json对象，在json对象内部定义。
 * factory 必须返回一个json对象。因此把this返回
 */
angular.module('myService', [])
    .service('getUserService', ['$http', function ($http) {

        this.getUser = function (cb) {
            this.testFunc();
            var _this = this;
            return $http.get('data.json').then(function (res) {
                _this.testFunc();//注意此时this指向了调用此函数的对象，其实是window
                return res.data;
            });

        };
        this.testFunc = function () {
            console.log('getUserService');
        };
        this.userList = {};

    }])
    .service('getUserService2', ['$http', function ($http) {

        var s = {
            getUser: function (cb) {
                //两种方式都可以
                a.testFunc();
                this.testFunc();
                var _this = this;
                return $http.get('data.json').then(function (res) {
                    //两种方式都可以
                    s.testFunc();
                    _this.testFunc();
                    return res.data;
                });

            },
            getUser2: function () {
                return $http.get('data.json');
            },
            testFunc: function () {
                console.log('getUserService2');
            },
            userList: []
        }

        return s;

    }])
    .factory('getUserFactory', ['$http', function ($http) {

        var s = {
            getUser: function (cb) {
                this.testFunc();
                var _this = this;
                return $http.get('data.json').then(function (res) {
                    //两种方式都可以
                    s.testFunc();
                    _this.testFunc();
                    return res.data;
                });

            },
            getUser2: function () {
                return $http.get('data.json');
            },
            testFunc: function () {
                console.log("getUserFactory");
            },
            userList: []
        };

        return s;

    }])
    .factory('getUserFactory2', ['$http', function ($http) {

        this.getUser = function (cb) {
            this.testFunc();
            var _this = this;
            return $http.get('data.json').then(function (res) {
                _this.testFunc();
                return res.data;
            });

        };
        this.getUser2 = function () {
            return $http.get('data.json');
        };
        this.testFunc = function () {
            console.log('getUserFactory2');
        };
        this.userList = [];
        return this;//factory 必须翻译一个json对象。因此把this反回

    }])
    //provider不能注入自带服务。一下写法，其实错误，暂时不知道为什么
    .provider('getUserProvider', [ function () {

        this.s = {
            getUser: function (cb) {
                console.log(s.testFunc);
            },
            getUser2: function () {
                return s.getUser();
            },
            testFunc: function () {
                console.log(testFunc);
            },
            userList: []
        };

        this.$get = function () {
            return this.s;
        };


    }]);