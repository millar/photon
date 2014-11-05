/*!
 * User and Admin angular application
 *
 */

 angular.module('adminApp', [
  'templates',
  'ngRoute',
  'ngCookies',
  'ngAnimate',

  'directives',

  'adminControllers',
  'adminServices'
 ])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $location) {
      $routeProvider.
        when('/admin/photos/:id', {
          controller: 'PhotosShowController',
          templateUrl: 'admin/photos/show.html'
        }).
        when('/admin/photos', {
          controller: 'PhotosIndexController',
          templateUrl: 'admin/photos/index.html'
        }).
        when('/admin/upload', {
          controller: 'UploadController',
          templateUrl: 'admin/upload.html'
        }).
        when('/admin/', {
          templateUrl: 'admin/index.html'
        }).
        otherwise({
          template: "<loading-icon></loading-icon>",
          controller: 'UserForwardController'
        });

      $location.html5Mode(true).hashPrefix('!');
    }
  ])
  .run(['$rootScope',
    function($rootScope){
      $rootScope.changes = 0;

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
