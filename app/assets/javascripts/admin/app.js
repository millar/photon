/*!
 * User and Admin angular application
 *
 * TODO: Validate slug uniqueness on clientside
 *
 *
 */

window.$adminApp = {current_user: null};

 angular.module('adminApp', [
  'templates',
  'ngRoute',
  'ngCookies',
  'ngAnimate',

  'directives',

  'adminControllers',
  'adminServices'
 ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $location, $httpProvider) {
      $routeProvider.
        when('/admin/albums/:id/upload', {
          controller: 'AlbumsUploadController',
          templateUrl: 'admin/albums/upload.html'
        }).
        when('/admin/albums/new', {
          controller: 'AlbumsNewController',
          templateUrl: 'admin/albums/new.html'
        }).
        when('/admin/albums/:id/edit', {
          controller: 'AlbumsEditController',
          templateUrl: 'admin/albums/edit.html'
        }).
        when('/admin/albums/:id', {
          controller: 'AlbumsShowController',
          templateUrl: 'admin/albums/show.html',
          reloadOnSearch: false
        }).
        when('/admin/albums', {
          controller: 'AlbumsIndexController',
          templateUrl: 'admin/albums/index.html'
        }).


        when('/admin/photos/upload/:albumId?', {
          controller: 'UploadController',
          templateUrl: 'admin/upload.html'
        }).


        when('/admin/photos/uploaded', {
          controller: 'PhotosUploadedController',
          templateUrl: 'admin/photos/uploaded.html'
        }).
        when('/admin/photos/:id/edit', {
          controller: 'PhotosEditController',
          templateUrl: 'admin/photos/edit.html'
        }).
        when('/admin/photos/:id', {
          controller: 'PhotosShowController',
          templateUrl: 'admin/photos/show.html'
        }).
        when('/admin/photos', {
          controller: 'PhotosIndexController',
          templateUrl: 'admin/photos/index.html'
        }).


        when('/admin/', {
          templateUrl: 'admin/index.html'
        }).
        otherwise({
          template: "<loading-icon></loading-icon>",
          controller: 'UserForwardController'
        });

      $location.html5Mode(true).hashPrefix('!');

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
  ])
  .run(['$rootScope',
    function($rootScope){
      $rootScope.changes = 0;
      $rootScope.current_user = window.$adminApp.current_user;

      $rootScope.$on('$locationChangeStart', function(){
        if ($rootScope.changes) $('#yield').remove();

        if ($rootScope.changes < 2) $rootScope.changes++;
      });


      Dropzone.autoDiscover = false;
    }]);


angular.module('userApp', [
 'templates',
 'ngRoute',

 'userControllers'
])
 .config(['$routeProvider', '$locationProvider',
   function($routeProvider, $location) {
     $routeProvider.
       when('/', {
         templateUrl: 'user/index.html'
       }).
       when('/admin/:path*?', {
         controller: 'AdminForwardController',
         template: " "
       });

     $location.html5Mode(true).hashPrefix('!');
   }
 ]);
