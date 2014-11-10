'use strict';

/* Admin Controllers */

window.$adminApp.controllers = angular.module('adminControllers', [])
  .controller('MainController', ['$scope', '$location',
    function($scope, $location) {
      $scope.isActive = function (viewLocation) {
        return $location.path().match(viewLocation);
	    };
      $scope.isFragment = function (viewLocation) {
        return $location.hash().match(viewLocation);
      };

      $scope.siteUrl = [$location.protocol() + ":", "", $location.host(), ""].join('/');
    }])
  .controller('UserForwardController', ['$scope', '$location', '$rootScope',
    function($scope, $location, $rootScope) {
      if ($rootScope.changes != 1){
        window.location.href = $location.path();
      } else {
        $scope.loaded = true;
      }
    }])
  .controller('UploadController', ['$scope', '$cookies', '$routeParams', '$timeout',
    function($scope, $cookies, $routeParams, $timeout) {
      $scope.albumId = $routeParams.albumId;
      $scope.loaded = true;
      $scope.started = false;

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
          $scope.loaded = false;
        })

        $scope.dropzone.on('queuecomplete', function(){
          $scope.loaded = true;
        })

        $scope.dropzone.on('totaluploadprogress', function(percent){
          $('#upload-percentage').text((percent + "").split('.')[0]);
        })
      });

      $scope.$on('$destroy', function(){
        $scope.dropzone.disable();
      })
    }]);
