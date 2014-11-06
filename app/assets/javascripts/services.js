'use strict';

/* Services */

angular.module('adminServices', ['ngResource'])
  .factory('Photo', ['$resource',
    function($resource){
      return $resource('/api/admin/photos/:id.json', {}, {
        'update': { params: {id:'@id'}, method:'PUT' }
      });
    }])
  .factory('Album', ['$resource',
    function($resource){
      return $resource('/api/admin/albums/:id.json', {}, {
        'update': { params: {id:'@id'}, method:'PUT' }
      });
    }]);
