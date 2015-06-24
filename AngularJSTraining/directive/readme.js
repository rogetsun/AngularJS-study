/**
 * directive:
 * var app = angular.module('app',[]);
 * app.directive('name', function () {
        return {
            restrict: 'AE',//
            replace: true,
            template: '<p style="background-color:{{color}}"></p>',
            transclude: 'element'||true,
            require:""? - 不要抛出异常。这使这个依赖变为一个可选项。
                ^ - 允许查找父元素的controller
            scope:{
                attributeName:"= jsonobject 双向绑定，
                @字符串单项获取
                &function绑定"
            }
            link: function(scope,elem,attr,controller){
                elem.bind('click',function(){
                    elem.css('background-color','white');
                scope.$apply(function(){
                    scope.color = "white";
                });

                elem.bind('mouseover',function(){
                    elem.css('cursor','pointer');
                });
            },
            controller:function(scope, elem, attr){
                this.getUser = function(u){
                }
            }
            complie: function(elem,attr){
                attr.nameName2
                return
            }
        }
    })


    x-name-name2
    name-name2
    name:name2
    data-name-name2


 */


