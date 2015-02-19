window.$adminApp.registry.push('settings');

angular.module('settings', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/admin/settings', {
          templateUrl: 'admin/settings/index.html',
          controller: 'SettingsController'
        });
    }])

  .controller('SettingsController', ['$scope', 'Config', 'Category',
    function($scope, Config, Category) {
      $scope.config = Config.get(function(config){
        $scope.loaded = true;
      });

      $scope.categories = Category.query(function(categories){
        $scope.categoriesLoaded = true;
      });

      $scope.save = function(){
        $scope.saved = false;
        $scope.config.$update(function(config){
          $scope.config = config;
          $scope.saved = true;
        });
      };

      $scope.al = $('#album-links').sortable({
        forcePlaceholderSize: true,
        handle: '.handle',
        axis: 'y',
        update: function(event, ui){
          if ($scope.savingCategoryOrder == true) return false;
          $scope.savingCategoryOrder = true;
          $scope.al.sortable("disable").addClass('pending').removeClass('fade-op');
          var cat = ui.item.data('category');
          cat.pos = $scope.al.sortable("toArray", {attribute: "data-category-id"}).indexOf(cat.id+"");
          new Category({id: cat.id, position: cat.pos}).$update(function(){
            $scope.savingCategoryOrder = false;
            $scope.al.sortable("enable").removeClass('pending').addClass('fade-op');
          })
        }
      });

      $scope.updateCategory = function(category, e){
        if (category.pending) e.preventDefault();
        category.pending = true;
        category.$update(function(c){
          category.pending = category.edit = false;
        })
      };

      $scope.$on('$destroy', function(){
        $scope.al.sortable('destroy');
      });
    }])
