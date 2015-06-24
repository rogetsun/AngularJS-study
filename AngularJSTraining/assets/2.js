/**
 * Created by uv2sun on 14-12-17.
 */
var myApp = angular.module("myApp",['service']);

myApp.controller('myCtrl',['$scope','$http', function ($scope,$http) {

    $scope.person={
        id:1,
        name:"name1"
    };

    $scope.change = function () {
        console.log(JSON.stringify($scope.person));
        $http({
            url:"1.json",
            method:"get"
        }).success(function (data, header) {

        })
    }

    $scope.submit= function () {
        console.log(JSON.stringify($scope.person));
    }

}]);
