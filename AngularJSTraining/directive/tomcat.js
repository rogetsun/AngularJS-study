var app2 = angular.module('app2',[]);
app2.directive('tomcat', function () {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        scope: {
            isStart: "=",
            apps: "="
        },
        template: "<div><span>tomcat 状态{{isStart}}</span><hr>" +
        "<span  ng-transclude></span><hr>" +
        "<button ng-click='start()'>启动</button>" +
        "<button ng-click='stop()'>停止</button></div>",
        controller: ['$scope','$element','$attrs',function (scope, elem, attr) {
            this.start = scope.start = function () {
                if(scope.isStart){
                    console.log('已启动');return;
                }
                console.log('start tomcat ...');
                scope.isStart = true;
            };
            this.stop = scope.stop = function () {
                if(scope.isStart){
                    console.log('stop tomcat ...');
                    scope.isStart = false;
                    for (var i = 0; i < scope.apps.length; i++) {
                        scope.apps[i].status = false;
                    }
                }else{
                    console.log('已停止')
                }

            }
        }],
        link: ['$scope',function (scope) {
            console.log(scope.isStart);
        }]
    }
});

app2.directive('application', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {app: "=",isStart:"="},
        require:"^tomcat",
        template: "<div><span>{{app.id}}-{{app.name}} status is {{app.status}}</span>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span>tomcat status:{{isStart}}</span>" +
        "<button ng-click='startTomcat()'>启动Tomcat</button>" +
        "<button ng-click='toggle(app)'>启动/stop</button></div>",
        link: function (scope, elem, attr, ctrl) {
            scope.startTomcat = function () {
                ctrl.start();
            };

            scope.stop = function () {
                ctrl.stop();
            }
            scope.toggle = function (s) {
                scope.isStart?
                    s.status = !s.status:console.log('请先启动tomcat');
            }
        }
    }
});
/**
 * Created by uv2sun on 14-12-18.
 */
