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
        when('/', {
          templateUrl: 'admin/index.html'
        });

      $location.html5Mode(true).hashPrefix('!');
    }
  ]);


angular.module('userApp', [
 'templates',
 'ngRoute',

 'adminControllers'
])
 .config(['$routeProvider', '$locationProvider',
   function($routeProvider, $location) {
     $routeProvider.
       when('/', {
         templateUrl: 'user/index.html'
       });

     $location.html5Mode(true).hashPrefix('!');
   }
 ]);
