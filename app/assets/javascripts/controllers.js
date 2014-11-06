'use strict';

/* Admin Controllers */

window.$adminApp.controllers = angular.module('adminControllers', [])
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
  .controller('UploadController', ['$scope', '$cookies',
    function($scope, $cookies) {
      $scope.loaded = true;
      $scope.started = false;

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
