/**
 * Created by uv2sun on 14-12-29.
 */
angular.module('main', ['ui.router', 'uvServices', 'mainCtrl'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('main', {
                url: "/",
                views: {
                    'content': {
                        templateUrl: "app/default_content.html",
                        controller: 'ctrl'
                    },
                    'left': {
                        templateUrl: 'app/left/left.html',
                        controller: "ctrl"
                    }
                }
            })
            .state('booklist', {
                url: '/booklist',
                views: {
                    'content':{
                        templateUrl: 'app/book/booklist.html',
                        controller: ['$scope', '$http', 'bookService', function ($scope, $http, bookService) {
                            bookService.getBookList(function (data) {
                                $scope.books = data;
                            });
                            $scope.show = function (o) {
                                console.log(o);
                            };
                        }]
                    },
                    'left': {
                        templateUrl: 'app/left/left.html',
                        controller: "ctrl"
                    }
                }
            })
        ;
    }]).controller('ctrl', function ($scope) {
        $scope.content = "my first ui-router htmlapp";
        $scope.left = "left";
    });

angular.module('mainCtrl',[]).controller('bookCtrl',['$scope', '$http', 'bookService', function ($scope, $http, bookService) {
    bookService.getBookList(function (data) {
        $scope.books = data;
    });
    $scope.show = function (o) {
        console.log(o);
    };
}]);
