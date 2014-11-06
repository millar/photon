'use strict';

/* Admin Controllers */

window.$adminApp.controllers
  .controller('AlbumsIndexController', ['$scope', 'Album',
    function($scope, Album) {
      $scope.loaded = false;

      $scope.albums = Album.query(function(albums){
        $scope.loaded = true;
      });
    }])
  .controller('AlbumsShowController', ['$scope', '$routeParams', 'Album',
    function($scope, $routeParams, Album) {
      $scope.loaded = false;

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $scope.loaded = true;
      });
    }])
  .controller('AlbumsNewController', ['$scope', 'Album',
    function($scope, Album) {
      $scope.album = new Album();
    }])
  .controller('AlbumsEditController', ['$scope', '$location', '$routeParams', 'Album',
    function($scope, $location, $routeParams, Album) {
      $scope.loaded = false;

      $scope.submit = function(){
        $scope.album.$update(function(){
          var redirectTo = $location.path().split('/');
          redirectTo.pop();
          $location.path(redirectTo.join('/'));
        });
      }

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $scope.loaded = true;
      });
    }])
