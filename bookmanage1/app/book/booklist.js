/**
 * booklist
 * Created by uv2sun on 14-12-30.
 */
angular.module("booklist", [])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state({
                name: "home.main.booklist",
                url: "/booklist",
                templateUrl: 'app/book/booklist.html',
                controller: function ($scope, $http, books) {
                    //bookService.getBooks(function (data) {
                    //    $scope.books = data;
                    //});

                    $scope.books = books;

                },
                resolve: {
                    books: ['bookService', function (bs) {
                        return bs.booklist;
                    }]
                }

            })
            .state({
                name: "home.main.bookedit",
                url: '/book/{bookId:int}',
                templateUrl: 'app/book/book_edit.html',
                resolve:{
                    books:['bookService', function (bs) {
                        return bs.booklist;
                    }]
                },
                controller: function ($scope, $http, $stateParams, $state, books, bookService) {
                    console.log(books);
                    for (var b in books) {
                        if (books[b].id == $stateParams.bookId) {
                            $scope.book = books[b];
                            console.log(books[b]);
                            break;
                        }
                    }
                    ;
                    $scope.returnback = function () {
                        $state.go('-1', $stateParams);
                    }
                }
            });

    })

    .service('bookService', function ($http) {

        return {
            booklist: $http({url: "data/booklist.json"})
                .then(function (rs) {
                    return rs.data;
                })
        };
    });
