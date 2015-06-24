/**
 *
 * Created by uv2sun on 14-12-29.
 */
angular.module('uvServices',[])
    .service('bookService', function ($http) {
        return {
            'getBookList': function (cb) {
                if(cb && typeof cb == 'function'){
                    $http({url:"data/booklist.json",method:"POST"})
                        .success(function (data) {
                            cb(data);
                        });
                }
            }
        }
    })
