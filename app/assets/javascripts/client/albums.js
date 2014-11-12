'use strict';

/* Admin Controllers */

window.$clientApp.controllers
  .controller('AlbumsShowController', ['$scope', '$routeParams', 'Album', '$sce', '$location', '$document', '$timeout',
    function($scope, $routeParams, Album, $sce, $location, $document, $timeout) {
      $scope.notFound = false;
      $scope.photoId = $location.path().split('/photo/')[1]||null;

      $scope.photosById = {};

      $scope.album = Album.get({id: $routeParams.id}, function(album){
        $.each(album.photos, function(idx, photo){
          $scope.photosById[photo.id] = photo;
        });

        $scope.openPhoto();
        $scope.description = $sce.trustAsHtml(album.description);

        $scope.loaded = true;
      }, function(e){
        if (e.status == 404){
          $scope.notFound = true;
        }
      });

      $scope.setPhoto = function(photoId){
        $scope.photoId = photoId;

        $timeout(function(){
          if ($scope.photoId){
            $location.path('/'+$scope.album.slug+'/photo/'+$scope.photoId, false);
          } else {
            $location.path('/'+$scope.album.slug, false);
          }

          $scope.openPhoto();
        });
      }

      $scope.openPhoto = function(){
        $scope.photo = $scope.photoId && $scope.photosById[$scope.photoId];

        $scope.photoPrev = null;
        $scope.photoNext = null;

        var last;
        var past = false;

        var albums = angular.copy($scope.album.photos);
        albums.sort(function(a,b){return a.position-b.position});

        $.each(albums, function(idx, p){
          if ($scope.photoId == p.id){
            $scope.photoPrev = last;
            past = true;
          } else if (past && !$scope.photoNext){
            $scope.photoNext = p;
          }

          last = p;
        });
      }

      $document.on('keydown', function(event) {
        if ($scope.photoId){
          if (event.keyCode == 37 && $scope.photoPrev){
            $scope.setPhoto($scope.photoPrev.id);
          } else if (event.keyCode == 39 && $scope.photoNext){
            $scope.setPhoto($scope.photoNext.id);
          }
        }
      })

      $scope.$on("$destroy", function(){
        $document.off('keydown');
      });
    }])
