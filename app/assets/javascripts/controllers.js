'use strict';

/* Admin Controllers */

angular.module('adminControllers', [])
  .controller('MainController', ['$scope', '$location',
    function($scope, $location) {

    }])
  .controller('UserForwardController', ['$scope', '$location', '$rootScope',
    function($scope, $location, $rootScope) {
      if ($rootScope.changes != 1){
        window.location.href = $location.path();
      } else {
        $scope.loaded = true;
      }
    }])
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
  .controller('UploadController', ['$scope', '$cookies',
    function($scope, $cookies) {
      $('#photo-uploader').dropzone({
        headers: {
          'X-CSRF-Token': $cookies['XSRF-TOKEN']
        },
        paramName: "photo[original]",
        acceptedFiles: 'image/*',

        thumbnailWidth: 150,
        thumbnailHeight: 150,
      });
    }]);


/* User Controllers */

angular.module('userControllers', [])
  .controller('MainController', ['$scope', '$location',
    function($scope, $location) {

    }])
  .controller('AdminForwardController', ['$scope', '$location',
    function($scope, $location) {
      window.location.href = $location.path();
    }])
  .controller('HomeController', ['$scope',
    function($scope) {

    }]);
