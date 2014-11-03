'use strict';

/* Admin Controllers */

angular.module('adminControllers', [])
  .controller('MainController', ['$scope', '$location',
    function($scope, $location) {

    }])
  .controller('UserForwardController', ['$scope', '$location',
    function($scope, $location) {
      window.location.href = $location.path();
    }])
  .controller('PhoneDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

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
