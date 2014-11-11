'use strict';

/* Admin Controllers */

window.$adminApp.controllers
  .controller('UsersIndexController', ['$scope', 'User',
    function($scope, User) {
      $scope.loaded = false;

      $scope.users = User.query(function(photos){
        $scope.loaded = true;
      });
    }])
