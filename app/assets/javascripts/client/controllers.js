'use strict';

/* Admin Controllers */

window.$clientApp.controllers = angular.module('clientControllers', [])
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
  .controller('AdminForwardController', ['$scope', '$location',
      function($scope, $location) {
        window.location.href = $location.path();
      }])
  .controller('HomeController', ['$scope',
    function($scope) {

    }]);
