/**
 *
 * Created by uv2sun on 15-1-5.
 */
angular.module('myService', [])
    .service('getUserService', ['$http', function ($http) {


        this.getUser = function (cb) {
            this.testFunc();
            var _this = this;
            return $http.get('data.json').then(function (res) {
                _this.userList.data = res.data;
                console.log(_this);
                return res.data;
            });

        };
        this.getUser2 = function () {
            return $http.get('data.json');
        };
        this.testFunc = function () {
            console.log('getUserService');
        };
        this.userList = {};

    }])
    .service('getUserService2', ['$http', function ($http) {


        var s = {
            getUser: function (cb) {
                this.testFunc();
                var _this = this;
                return $http.get('data.json').then(function (res) {
                    s.userList.data = res.data;
                    console.log(_this);
                    return res.data;
                });

            },
            getUser2: function () {
                return $http.get('data.json');
            },
            testFunc: function () {
                console.log('getUserService2');
            },
            userList: {}
        }

        return s;
        
    }])
    .factory('getUserFactory', ['$http', function ($http) {


        var s = {
            getUser: function (cb) {
                s.testFunc();
                return $http.get('data.json').then(function (res) {
                    s.userList = res.data;
                    console.log(s);
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
                _this.userList = res.data;
                console.log(_this);
                return res.data;
            });

        };
        this.getUser2 = function () {
            return $http.get('data.json');
        };
        this.testFunc = function () {
            console.log('getUserFactory2');
        };
        this.userList = []
        return this;//factory

    }])
    //provider不能注入自带服务。
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
        }

        this.$get = function () {
            return this.s;
        };


    }]);
