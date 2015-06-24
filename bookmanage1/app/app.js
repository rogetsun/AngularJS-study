/**
 *
 * Created by uv2sun on 14-12-30.
 */

angular.module('app', ['ui.router', 'booklist'])
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state('home', {
                abstract: true,
                url: '',
                templateUrl: 'app/main/main.html',
                controller: function ($scope) {
                    $scope.title = "my book";
                    $scope.ss = [
                        {
                            title: 'main', state: 'home.main',
                            url: "#/main"
                        },
                        {
                            title: 'booklist', state: 'home.main.booklist',
                            url: "#/main/booklist"
                        },

                    ]
                }
            })
            .state({
                name: 'home.main',
                url: '/main',
                resolve: {
                    now: function () {
                        return new Date();
                    }
                },
                views: {
                    "left": {
                        template: '<ul>' +
                        '<li ng-repeat="s in ss">' +
                        '<a ui-sref="{{s.state}}" ui-sref-active="active">{{s.title}}</a>' +
                        '</li>' +
                        '</ul><hr/>{{test}}',
                        controller: function ($scope, now) {
                            $scope.test = now;
                        }
                    },
                    "": {
                        template: "{{test}}<hr/><ui-view></ui-view>",
                        controller: function ($scope, now) {
                            $scope.test = now;
                        }
                    },
                    "hint@": {
                        templateProvider: function ($stateParams) {
                            return "my hint " + $stateParams.id + "<hr/>{{test}}";
                        },
                        controller: function ($scope, now) {
                            $scope.test = now;
                        }
                    }
                }
            })
        ;
    }])
;
