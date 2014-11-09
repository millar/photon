'use strict';

/* Admin Controllers */

window.$adminApp.controllers
  .controller('PhotosIndexController', ['$scope', 'Photo',
    function($scope, Photo) {
      $scope.loaded = false;

      // $scope.deletePhoto = function(photo){
      //   $('[data-pending=photo-'+photo.id+']').addClass('pending');
      //
      //   new Photo({id: photo.id}).$delete(function(){
      //     // var index = $scope.photos.indexOf(photo);
      //     $scope.photos = $.grep($scope.photos, function(p){
      //       return p.id != photo.id;
      //     });
      //
      //     $('[data-pending=photo-'+photo.id+']').removeClass('pending');
      //   });
      // }
      //
      // $scope.loadMore = function(n){
      //   n = n || 12;
      //   var start = $scope.offset;
      //   $scope.offset += n;
      //
      //   $scope.loading = true;
      //   srv({method:'GET', url: '/api/admin/photos.json', params: {limit: n, offset: start}}).then(function(photos) {
      //     $scope.photos.push.apply($scope.photos, photos.data);
      //     $scope.loading = false;
      //     $scope.loaded = true;
      //   });
      // }
      //
      // $scope.loadMore(12);
      // $scope.loadMore(12);
      // $scope.loadMore(12);

      $scope.photos = Photo.query(function(photos){
        $scope.loaded = true;

        $scope.deletePhoto = function(photo){
          $('[data-pending=photo-'+photo.id+']').addClass('pending');

          photo.$delete(function(){
            var index = $scope.photos.indexOf(photo);
            $scope.photos = $scope.photos.splice(index, 1);

            $('[data-pending=photo-'+photo.id+']').removeClass('pending');
          });
        }
      });
    }])
  .controller('PhotosShowController', ['$scope', '$routeParams', 'Photo', '$sce',
    function($scope, $routeParams, Photo, $sce) {
      $scope.loaded = false;

      $scope.photo = Photo.get({id: $routeParams.id}, function(photo){
        $scope.loaded = true;

        $scope.description = $sce.trustAsHtml(photo.full_description);
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
          $scope.photo.album_count += 1;
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
          $scope.photo.album_count -= 1;
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
