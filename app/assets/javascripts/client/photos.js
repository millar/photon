'use strict';

/* Admin Controllers */

window.$clientApp.controllers
  // .controller('PhotosIndexController', ['$scope', 'Photo',
  //   function($scope, Photo) {
  //     $scope.loaded = false;
  //
  //     // $scope.deletePhoto = function(photo){
  //     //   $('[data-pending=photo-'+photo.id+']').addClass('pending');
  //     //
  //     //   new Photo({id: photo.id}).$delete(function(){
  //     //     // var index = $scope.photos.indexOf(photo);
  //     //     $scope.photos = $.grep($scope.photos, function(p){
  //     //       return p.id != photo.id;
  //     //     });
  //     //
  //     //     $('[data-pending=photo-'+photo.id+']').removeClass('pending');
  //     //   });
  //     // }
  //     //
  //     // $scope.loadMore = function(n){
  //     //   n = n || 12;
  //     //   var start = $scope.offset;
  //     //   $scope.offset += n;
  //     //
  //     //   $scope.loading = true;
  //     //   srv({method:'GET', url: '/api/admin/photos.json', params: {limit: n, offset: start}}).then(function(photos) {
  //     //     $scope.photos.push.apply($scope.photos, photos.data);
  //     //     $scope.loading = false;
  //     //     $scope.loaded = true;
  //     //   });
  //     // }
  //     //
  //     // $scope.loadMore(12);
  //     // $scope.loadMore(12);
  //     // $scope.loadMore(12);
  //
  //     $scope.photos = Photo.query(function(photos){
  //       $scope.loaded = true;
  //
  //       $scope.deletePhoto = function(photo){
  //         $('[data-pending=photo-'+photo.id+']').addClass('pending');
  //
  //         photo.$delete(function(){
  //           var index = $scope.photos.indexOf(photo);
  //           $scope.photos = $scope.photos.splice(index, 1);
  //
  //           $('[data-pending=photo-'+photo.id+']').removeClass('pending');
  //         });
  //       }
  //     });
  //   }])
  .controller('PhotosShowController', ['$scope', '$routeParams', 'Photo', '$sce',
    function($scope, $routeParams, Photo, $sce) {
      $scope.loaded = false;

      $scope.photo = Photo.get({id: $routeParams.id}, function(photo){
        $scope.loaded = true;

        $scope.description = $sce.trustAsHtml(photo.full_description);
      });
    }])
