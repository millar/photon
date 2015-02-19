'use strict';

/* Admin Controllers */

window.$clientApp.controllers
  .controller('CategoriesShowController', ['$scope', '$routeParams', 'Category',
    function($scope, $routeParams, Category) {
      $scope.notFound = false;

      $scope.category = Category.get({id: $routeParams.id}, function(category){
        $scope.loaded = true;
      }, function(e){
        if (e.status == 404){
          $scope.notFound = true;
        }
      });
    }])
