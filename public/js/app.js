'use strict';

angular.module('BookmarksApp', ['BookmarkService'])

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: bookmarkCtrl.List,
                templateUrl:'partials/list'
            })
            .when('/new', {
                controller: bookmarkCtrl.New,
                templateUrl:'partials/edit'
            })
            .when('/edit/:id', {
                controller: bookmarkCtrl.Edit,
                templateUrl:'partials/edit'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++) {
                input.push(i);
            }
            return input;
        };
    });
