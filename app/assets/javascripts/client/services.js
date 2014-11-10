'use strict';

/* Services */

angular.module('clientServices', ['ngResource'])
  .factory('Photo', ['$resource',
    function($resource){
      return $resource('/api/photos/:id.json');
    }])
  .factory('Album', ['$resource',
    function($resource){
      return $resource('/api/albums/:id.json');
    }]);
