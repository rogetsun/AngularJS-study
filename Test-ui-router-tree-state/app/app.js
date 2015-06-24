/**
 *
 * Created by uv2sun on 15-1-4.
 */
angular.module('app', ['ui.router'])
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state('main2', {
                url:'/main',
                views:{
                    'v1': {
                        //template:'main:<hr/><div ui-view="v7">i am view 7</div>' +
                        //'<div ui-view="v8">i am view 8</div>'
                        template: 'i am view 1 2'
                    },
                    'v2': {
                        //template:'main:<hr/><div ui-view="v3"></div>'
                        template: 'i am view 2 2'
                    }
                }
            })
            .state('main', {
                url: '/main',
                views: {
                    'v1': {
                        //template:'main:<hr/><div ui-view="v7">i am view 7</div>' +
                        //'<div ui-view="v8">i am view 8</div>'
                        template: 'i am view 1'
                    },
                    'v2': {
                        //template:'main:<hr/><div ui-view="v3"></div>'
                        template: 'i am view 2'
                    }
                }
            })
            .state('sub1', {
                url: '/sub1',
                views: {
                    'v1': {
                        template: 'sub1:<hr/><div ui-view="v7">i am view 7</div>' +
                        '<div ui-view="v8">i am view 8</div>'
                    },
                    'v2': {
                        template: 'sub1:<hr/><div ui-view="v3">i am view 3</div>' +
                        '<div ui-view="v4">i am view 4</div>'
                    }
                }
            })
            .state('sub1.left', {
                url: '/left',
                views: {
                    'v7': {
                        template: 'left:<div > i am v7’s view </div>'
                    },
                    'v8': {
                        template: 'left:<div> i am v8’s view</div>'
                    }
                }
            })
            .state('sub1.left.content', {
                url: '/content',
                views: {
                    'v3@sub1': {
                        template: 'content:<div>i am v3’s view</div>'
                    },
                    'v4@sub1': {
                        template: 'content:<div>i am v4’s view</div>'
                    }
                }
            })
            .state('sub1.content', {
                url: '/content',
                views: {
                    'v3': {
                        template: 'content:<div>i am v3’s view</div>'
                    },
                    'v4': {
                        template: 'content:<div>i am v4’s view</div>' +
                        '<hr/><div class="row">' +
                        '<div ui-view="v5" class="col-sm-12">i am view 5</div>' +
                        '<div ui-view="v6" class="col-sm-12">i am view 6</div>' +
                        '</div>'
                    },
                    'v7': {
                        template: 'left:<div > i am v7’s view </div>'
                    },
                    'v8': {
                        template: 'left:<div> i am v8’s view</div>'
                    },
                    'tips@': {
                        template: '<hr/>hint:<div>i am hint view {{text}}</div>',
                        controller: function ($scope) {
                            $scope.text = 'litx';
                        }
                    }
                }
            })
            .state('sub1.content.detail', {
                url: '/dtl',
                views: {
                    'v5': {
                        template: '<div> i am v5’s view</div>'
                    },
                    'v6': {
                        template: '<div> i am v6’s view</div>'
                    },
                    'tips@': {
                        template: '<hr/>hint:<div> i am tips in detail {{text}}</div>',
                        controller: function ($scope) {
                            $scope.texts = 'litx is pig';
                        }
                    }
                }
            });
    }])
    .controller('ctrl', ['$state', '$scope', function ($state, $scope) {
        console.log($state);
        $scope.text = 'songyw';
    }]);
