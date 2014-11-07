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
