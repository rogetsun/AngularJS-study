/**
 *
 * Created by uv2sun on 15/1/8.
 */
angular.module('myService', [])
    .service('user.util', function ($http) {
        return {
            getUser: function () {
                return $http.get("../AJS/data.json")
                    .then(function (res) {
                        return res.data;
                    });
            }
        }
    });
