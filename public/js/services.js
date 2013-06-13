'use strict';

angular.module('BookmarkService', ['ngResource'])

    .factory('BookmarkResource', function($resource) {

        var api = $resource(
            'api/bookmarks/:param1/:param2',
            {
                'param1': ''
                , 'param2': ''
                , 'page': 1
                , 'size': 10
            }, {
                'update': { 'method': 'PUT' }
            }
        );

        return api;

    });