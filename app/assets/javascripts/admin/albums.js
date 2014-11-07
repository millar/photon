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
  .controller('AlbumsShowController', ['$scope', '$routeParams', 'Album', 'Photo', 'AlbumPhoto',
    function($scope, $routeParams, Album, Photo, AlbumPhoto) {
      $scope.loaded = false;

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $scope.loaded = true;
      });

      $scope.photosLoaded = false;
      $scope.loadPhotos = function(){
        if ($scope.photosLoaded) return;
        $scope.photos = Photo.query({limit: 20, order: "created_at", not_in: $scope.album.id}, function(albums){
          $scope.photosLoaded = true;
        });
      }

      $scope.addToAlbum = function(photoId){
        var ap = new AlbumPhoto({photo_id: photoId, album_id: $scope.album.id});

        $('[data-pending=photo-'+photoId+']').addClass('pending');

        ap.$create(function(ap){
          $scope.album.photos.push(ap.photo);
          $('[data-pending=photo-'+photoId+']').removeClass('pending');
        });
      }

      $scope.removeFromAlbum = function(photoId){
        var ap = new AlbumPhoto({photo_id: photoId, album_id: $scope.album.id});

        $('[data-pending=photo-'+photoId+']').addClass('pending');

        ap.$destroy(function(){
          $scope.album.photos = $.grep($scope.album.photos, function(photo){
            return photo.id != photoId;
          });
          $('[data-pending=photo-'+photoId+']').removeClass('pending');
        });
      }
    }])
  .controller('AlbumsNewController', ['$scope', 'Album', '$location',
    function($scope, Album, $location) {
      $scope.album = new Album();

      $scope.submit = function(){
        if ($scope.album.published){
          $scope.album.published = new Date();
        } else {
          $scope.album.published = null;
        }

        $scope.$broadcast('show-errors');
        if ($scope.albumForm.$invalid) { return; }

        $scope.album.$save(function(album){
          $location.path('/admin/albums/' + album.id)
        })
      }
    }])
  .controller('AlbumsEditController', ['$scope', '$location', '$routeParams', 'Album',
    function($scope, $location, $routeParams, Album) {
      $scope.loaded = false;

      $scope.submit = function(){
        if ($scope.album.published){
          $scope.album.published = new Date();
        } else {
          $scope.album.published = null;
        }

        $scope.$broadcast('show-errors');
        if ($scope.albumForm.$invalid) { return; }

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
