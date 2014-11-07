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
  .controller('PhotosEditController', ['$scope', '$location', '$routeParams', 'Photo', 'Album', 'AlbumPhoto',
    function($scope, $location, $routeParams, Photo, Album, AlbumPhoto) {
      $scope.loaded = false;

      $scope.saved = false;
      $scope.saving = 0;

      $scope.submit = function(){
        if (!$scope.photoForm.$dirty) return;
        $scope.saving += 1;
        $scope.photoForm.$setPristine();

        $scope.photo.$update(function(photo){
          $scope.photo = photo;
          // var redirectTo = $location.path().split('/');
          // redirectTo.pop();
          // $location.path(redirectTo.join('/'));
          $scope.saving -= 1;
          $scope.saved = true;
        });
      }

      $scope.photo = Photo.get({id: $routeParams.id}, function(photo){
        $scope.loaded = true;
      });

      $scope.albumsLoaded = false;
      $scope.loadAlbums = function(){
        if ($scope.albumsLoaded) return;
        $scope.albums = Album.query(function(albums){
          $scope.albumsLoaded = true;
        });
      }

      $scope.addToAlbum = function(albumId){
        var ap = new AlbumPhoto({photo_id: $scope.photo.id, album_id: albumId});

        $('[data-pending=album-'+albumId+']').addClass('pending');

        ap.$create(function(ap){
          $scope.photo.albums.push(ap.album);
          $('[data-pending=album-'+albumId+']').removeClass('pending');
        });
      }

      $scope.removeFromAlbum = function(albumId){
        var ap = new AlbumPhoto({photo_id: $scope.photo.id, album_id: albumId});

        $('[data-pending=album-'+albumId+']').addClass('pending');

        ap.$destroy(function(){
          $scope.photo.albums = $.grep($scope.photo.albums, function(album){
            return album.id != albumId;
          });
          $('[data-pending=album-'+albumId+']').removeClass('pending');
        });
      }
    }])
  .controller('PhotosUploadedController', ['$scope', '$routeParams', 'Photo',
    function($scope, $routeParams, Photo) {
      $scope.loaded = false;

      $scope.photos = Photo.query({unprocessed: true}, function(){
        $scope.loaded = true;
      });
    }])
