/*!
 * User and Admin angular application
 *
 */

 angular.module('adminApp', [
  'templates',
  'ngRoute',

  'adminControllers'
 ])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $location) {
      $routeProvider.
        when('/admin/', {
          templateUrl: 'admin/index.html'
        }).
        when('/admin/:path*?', {
          templateUrl: 'admin/404.html'
        }).
        otherwise({
          templateUrl: 'admin/index.html',
          controller: 'UserForwardController'
        });

      $location.html5Mode(true).hashPrefix('!');
    }
  ]);


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
         templateUrl: 'user/index.html'
       });

     $location.html5Mode(true).hashPrefix('!');
   }
 ]);
