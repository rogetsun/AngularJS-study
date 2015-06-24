/**
 * Created by uv2sun on 14-12-25.
 */
var utilApp = angular.module('util',[]);

utilApp.service('util.service',['$http', function ($http) {
    return {
        getData: function (url, cb) {
            if( url && cb && typeof cb == 'function'){
                $http({url:url,method:"POST"}).success(function (data) {
                    cb(data);
                    return true;
                });
            }else{
                return false;
            }
        },
        getUsers: function (cb) {
            this.getData("../AngularJS/10_data.json", cb);
        }
    }
}]);