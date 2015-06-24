/**
 *
 * Created by uv2sun on 15/1/8.
 */

angular.module('myDirec', [])
    .directive('myPar', function () {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {myUsers: "=", query: "="},
            controller: function ($scope, $element, $attrs) {
                this.setUserGender0 = function () {
                    angular.forEach($scope.myUsers, function (v, k) {
                        v.gender = 0;
                    });
                };
                this.setUserGender1 = function () {
                    angular.forEach($scope.myUsers, function (v, k) {
                        v.gender = 1;
                    });
                }
            },
            link: function (scope, elem, attr) {
                scope.query = {};
                scope.genders = [
                    {name: '全部'},
                    {id: 1, name: '男'},
                    {id: 0, name: '女'}
                ];
            },
            template: '<div>' +
                //'<table class="am-table am-table-radius am-table-striped am-table-hover">' +
            '<table class="table table-bordered table-striped table-hover table-condensed">' +
            '<tr><td>ID：<input class="input-" type="text" ng-model="query.id"/></td>' +
            '<td>姓名：<input class="input" type="text" ng-model="query.name"/></td>' +
            '<td>性别：<select class="input" type="text" ng-model="query.gender" ng-options="g.id as g.name for g in genders"></select></td></tr>' +
            '</table>' +
            '<table class="table table-striped table-hover table-condensed">' +
            '<thead><th>ID</th><th>姓名</th><th>性别</th><th>年龄</th><th>操作</th></thead>' +
            '<tbody ng-transclude></tbody></table>' +
            '</div>'
        }
    })
    .directive("myPerson", function () {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {myPerson: "="},
            require: "^?myPar",
            link: function (scope, elem, attr, ctrl) {
                scope.setMale = function (p) {
                    p.gender = 1;
                };
                scope.setFemale = function (p) {
                    p.gender = 0;
                };
                scope.setAllMale = function () {
                    ctrl.setUserGender1();
                };
                scope.setAllFemale = function () {
                    ctrl.setUserGender0();
                };
                scope.toggleMeCss = function (p) {
                    p.selected = !p.selected;
                };
            },
            template: '<tr  ng-class="myPerson.selected?\'info\':\'\'" ng-click="toggleMeCss(myPerson)">' +
            '<td class="col-sm-2 " >{{myPerson.id}}</td>' +
            '<td class="col-sm-3">{{myPerson.name}}</td>' +
            '<td class="col-sm-2">{{myPerson.gender==1?"男":"女"}}</td>' +
            '<td class="col-sm-2">{{myPerson.age}}</td>' +
            '<td class="col-sm-3">' +
            '<a href="" class="btn btn-primary btn-xs" ng-click="setMale(myPerson)">男</a>&nbsp;' +
            '<a href="" class="btn btn-primary btn-xs" ng-click="setFemale(myPerson)">女</a>&nbsp;' +
            '<a href="" class="btn btn-primary btn-xs" ng-click="setAllMale()">全男</a>&nbsp;' +
            '<a href="" class="btn btn-primary btn-xs" ng-click="setAllFemale()">全女</a>' +
            '</td>' +
            '</tr>'
        }
    });
