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
  .controller('AlbumsUploadController', ['$scope', 'Album', '$timeout', '$cookies', '$routeParams',
    function($scope, Album, $timeout, $cookies, $routeParams) {
      $scope.loaded = false;

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $scope.loaded = true;

        $timeout(function(){
          $scope.dropzone = new Dropzone('#photo-uploader', {
            headers: {
              'X-CSRF-Token': $cookies['XSRF-TOKEN']
            },
            paramName: "photo[original]",
            acceptedFiles: 'image/*',

            thumbnailWidth: 150,
            thumbnailHeight: 150,

            parallelUploads: 1
          });

          $scope.dropzone.on('addedfile', function(){
            $scope.started = true;
          })

          $scope.dropzone.on('success', function(file, response){
            $scope.album.photo_count++
          })

          $scope.dropzone.on('queuecomplete', function(){
          })

          $scope.dropzone.on('totaluploadprogress', function(percent){
            // $('#upload-percentage').text((percent + "").split('.')[0]);
          })
        });

        $scope.$on('$destroy', function(){
          $scope.dropzone.disable();
        })
      });
    }])
  .controller('AlbumsShowController', ['$scope', '$routeParams', '$timeout', 'Album', 'Photo', 'AlbumPhoto', '$http', '$sce', '$location', '$document',
    function($scope, $routeParams, $timeout, Album, Photo, AlbumPhoto, $http, $sce, $location, $document) {
      $scope.loaded = false;

      $scope.showingPhoto = null;
      $scope.modalPhoto = null;

      $scope.setPhoto = function(photoId){
        $timeout(function(){
          $location.search({photo: photoId});
          $scope.openPhoto();
        });
      }

      $scope.closePhoto = function(){
        $scope.showingPhoto = null;
        $scope.modalPhoto = null;
        $timeout(function(){
          $location.search('photo', null);
        })
        $('#photoModal').modal('hide');
      }

      $document.on('keydown', function(event) {
        if ($scope.showingPhoto){
          if (event.keyCode == 37 && $scope.modalPrev){
            $scope.setPhoto($scope.modalPrev);
          } else if (event.keyCode == 39 && $scope.modalNext){
            $scope.setPhoto($scope.modalNext);
          }
        }
      })

      $scope.openPhoto = function(){
        $scope.modalPhoto = null;
        var photoId = parseInt($location.search().photo);

        $scope.modalPrev = null;
        $scope.modalNext = null;

        var last;
        var past = false;

        var albums = angular.copy($scope.album.photos);
        albums.sort(function(a,b){return a.position-b.position});

        $.each(albums, function(idx, p){
          if (photoId == p.id){
            $scope.modalPrev = last;
            past = true;
          } else if (past && !$scope.modalNext){
            $scope.modalNext = p.id;
          }

          last = p.id;
        });

        $('#photoModal').modal('show');

        $scope.showingPhoto = photoId;
        $scope.modalPhoto = $.grep($scope.album.photos, function(p){return p.id == photoId})[0];

        if ($scope.modalPhoto.description){
          $scope.modalPhoto.full_description = $sce.trustAsHtml($scope.modalPhoto.full_description); // TODO: bugs?
        }
      }

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $scope.loaded = true;
        $scope.description = $sce.trustAsHtml(album.full_description);

        $timeout(function(){
          $('#photo-grid').sortable({
            forcePlaceholderSize: true,
            change: function(event, ui){
              var i = 0;
              $('#photo-grid > div').removeClass('clear-left').each(function(_, el){
                var $el = $(el);
                var id = $el.data('id') || ui.item.data('id');
                if (i % 4 == 0){
                  if ($el.data('id') != ui.item.data('id')){
                    $el.addClass('clear-left');
                  }
                }
                if ($el.data('id') != ui.item.data('id')){
                  i++;
                }
              });
            },
            update: function(event, ui){
              $('#photo-grid').sortable("disable").addClass('fade-op pending');
              var positions = [];
              $.each($scope.album.photos, function(idx, photo){
                positions[photo.album_photo_id] = idx;
              })

              $('#photo-grid > div').each(function(i, el){
                $scope.album.photos[positions[$(el).data('id')]].position = i;
              });
              var order = {};
              $.each($scope.album.photos, function(i, o){order[o.album_photo_id] = o.position});
              $http.put("/api/admin/albums/order.json", {
                album_photo_id: ui.item.data('id'),
                position: order[ui.item.data('id')]}
              ).success(function(){
                $('#photo-grid').sortable("enable").removeClass('fade-op pending');
              });
            }
          });
          $('#photo-grid').disableSelection();
          if (album.cover) $('#navbar').addClass('navbar-transparent');
        });

        $('#photoModal').on('hidden.bs.modal', function(e){
          $location.search('photo', null);
          if ($scope.showingPhoto){
            e.preventDefault();
            e.stopPropagation();
            $scope.closePhoto();
          }
        });

        $scope.$on("$destroy", function(){
          $('#photo-grid').sortable("destroy");
          $('#navbar').removeClass('navbar-transparent');
          $('#photoModal').off();
          $document.off('keydown');
        });

        if ($location.search().photo){
          $scope.openPhoto();
        }
      });

      $scope.togglePublish = function(){
        $('.togglepub-btn').addClass('pending');

        if (!$scope.album.published){
          $scope.album.published_at = new Date();
        } else {
          $scope.album.published_at = null;
        }

        $scope.album.$update(function(){
          $scope.album.published = !$scope.album.published;
          $('.togglepub-btn').removeClass('pending');
        });
      };

      $scope.$watch('newPhotoQuery', function(){
        $scope.loadPhotos();
      });

      $scope.photosLoaded = false;
      $scope.loadPhotos = function(){
        $scope.photosLoaded = false;
        $scope.photos = Photo.query({query: $scope.newPhotoQuery, limit: 20, order: "created_at desc", not_in: $scope.album.id}, function(albums){
          $scope.photosLoaded = true;
        });
      }

      $scope.addToAlbum = function(photoId){
        var ap = new AlbumPhoto({photo_id: photoId, album_id: $scope.album.id});

        $('[data-pending=photo-'+photoId+']').addClass('pending');

        ap.$create(function(ap){
          $scope.album.photos.push(ap.photo);
          $scope.album.photo_count += 1;
          $('[data-pending=photo-'+photoId+']').removeClass('pending');
        });
      }

      $scope.removeFromAlbum = function(photoId, position){
        var ap = new AlbumPhoto({photo_id: photoId, album_id: $scope.album.id});

        $('[data-pending=photo-'+photoId+']').addClass('pending');

        ap.$destroy(function(){
          $scope.album.photos = $.grep($scope.album.photos, function(photo){
            if (photo.position > position) photo.position--;
            return photo.id != photoId;
          });
          $scope.album.photo_count -= 1;
          $('[data-pending=photo-'+photoId+']').removeClass('pending');
        });
      }

      $scope.setCover = function(photoId){
        $http.put("/api/admin/albums/cover.json", {
          album_id: $scope.album.id,
          photo_id: photoId
        }).success(function(album){
          $scope.album.cover = album.cover;
          $('#navbar').addClass('navbar-transparent');
        });
      }
    }])
  .controller('AlbumsNewController', ['$scope', 'Album', '$location',
    function($scope, Album, $location) {
      $scope.album = new Album();
      $scope.new = true;

      $scope.autofillSlug = function(){
        if (!$scope.albumForm.slug.$dirty){
          if ($scope.album.title){
            $scope.album.slug = $scope.album.title
              .replace(/[ ]/ig, '-')
              .replace(/[^0-9a-z\-_]/ig, '')
              .replace(/--/g, '-').toLowerCase();
          } else {
            $scope.album.slug = undefined;
          }
        }
      }

      $scope.submit = function(){
        if ($scope.album.published){
          $scope.album.published_at = new Date();
        } else {
          $scope.album.published_at = null;
        }

        $scope.$broadcast('show-errors');
        if ($scope.albumForm.$invalid) { return; }

        $scope.album.$save(function(album){
          $location.path('/admin/albums/' + album.id)
        })
      }
    }])
  .controller('AlbumsEditController', ['$scope', '$location', '$routeParams', 'Album', '$http',
    function($scope, $location, $routeParams, Album, $http) {
      $scope.loaded = false;

      $scope.autofillSlug = function(){}

      $scope.submit = function(){
        if ($scope.album.published != $scope.originallyPublished){
          if ($scope.album.published){
            $scope.album.published_at = new Date();
          } else {
            $scope.album.published_at = null;
          }
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
        $scope.originallyPublished = album.published;
      });

      $scope.setCover = function(photoId){
        $http.put("/api/admin/albums/cover.json", {
          album_id: $scope.album.id,
          photo_id: photoId
        }).success(function(album){
          $scope.album.cover = null;
        });
      }
    }])
