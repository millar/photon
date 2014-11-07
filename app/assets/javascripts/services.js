'use strict';

/* Services */

angular.module('adminServices', ['ngResource'])
  .factory('Photo', ['$resource',
    function($resource){
      return $resource('/api/admin/photos/:id.json', {}, {
        'update': { params: {id:'@id'}, method:'PUT' },
      });
    }])
  .factory('Album', ['$resource',
    function($resource){
      return $resource('/api/admin/albums/:id.json', {}, {
        'update': { params: {id:'@id'}, method:'PUT' }
      });
    }])
  .factory('AlbumPhoto', ['$resource',
    function($resource){
      return $resource('/api/admin/albums/:albumId/photos/:photoId.json', {}, {
        'create': { params: {albumId:'@album_id'}, method:'POST' },
        'destroy': { params: {photoId:'@photo_id', albumId:'@album_id'}, method:'DELETE' }
      });
    }]);
