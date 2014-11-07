'use strict';

/* Admin Controllers */

window.$adminApp.controllers
  .controller('PhotosIndexController', ['$scope', 'Photo',
    function($scope, Photo) {
      $scope.loaded = false;

      $scope.photos = Photo.query(function(photos){
        $scope.loaded = true;
      });
    }])
  .controller('PhotosShowController', ['$scope', '$routeParams', 'Photo',
    function($scope, $routeParams, Photo) {
      $scope.loaded = false;

      $scope.photo = Photo.get({id: $routeParams.id}, function(photo){
        $scope.loaded = true;
      });
    }])
  .controller('PhotosEditController', ['$scope', '$location', '$routeParams', 'Photo', 'Album',
    function($scope, $location, $routeParams, Photo, Album) {
      $scope.loaded = false;

      $scope.submit = function(){
        $scope.photo.$update(function(){
          var redirectTo = $location.path().split('/');
          redirectTo.pop();
          $location.path(redirectTo.join('/'));
        });
      }

      $scope.photo = Photo.get({id: $routeParams.id}, function(photo){
        $scope.loaded = true;
      });

      $scope.albumsLoaded = false;
      $scope.loadAlbums = function(){
        $scope.albums = Album.query(function(albums){
          $scope.albumsLoaded = true;
        });
      }

      $scope.addToAlbum = function(albumId){
        
      }
    }])
  .controller('PhotosUploadedController', ['$scope', '$routeParams', 'Photo',
    function($scope, $routeParams, Photo) {
      $scope.loaded = false;

      $scope.photos = Photo.query({unprocessed: true}, function(){
        $scope.loaded = true;
      });
    }])
