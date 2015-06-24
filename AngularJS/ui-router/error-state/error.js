/**
 * Created by uv2sun on 15/3/16.
 */

angular.module('df.error', ['ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('error', {
            url:'/error',
            views:{
                '':{
                    templateUrl:'error.html',
                    controller: ['$scope', function ($scope) {
                        $scope.goback = function () {
                            history.go(-1);
                        }
                    }]
                }
            }
        });
    }]);