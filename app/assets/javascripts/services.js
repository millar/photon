'use strict';

/* Services */

angular.module('adminServices', ['ngResource'])
  .factory('Photo', ['$resource',
    function($resource){
      return $resource('/api/admin/photos/:id.json', {}, {
        'update': { params: {id:'@id'}, method:'PUT' },
        'delete': { params: {id:'@id'}, method:'DELETE' }
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
    }])
  .factory('srv', function($q,$http) {
    var queue=[];
    var execNext = function() {
      var task = queue[0];
      $http(task.c).then(function(data) {
        queue.shift();
        task.d.resolve(data);
        if (queue.length>0) execNext();
      }, function(err) {
        task.d.reject(err);
      })
      ;
    };
    return function(config) {
      var d = $q.defer();
      queue.push({c:config,d:d});
      if (queue.length===1) execNext();
      return d.promise;
    };
  });
