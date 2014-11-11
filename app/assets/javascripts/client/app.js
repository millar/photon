/*!
 * User angular application
 *
 * TODO: Validate slug uniqueness on clientside
 *
 *
 */

window.$clientApp = {current_user: null};

angular.module('clientApp', [
  'templates',
  'ngRoute',
  'ngCookies',
  'ngAnimate',

  'directives',

  'clientControllers',
  'clientServices'
])
  .config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $location, $httpProvider) {
      $routeProvider.
          when('/', {
            templateUrl: 'client/index.html'
          }).

          when('/photos/:id', {
            templateUrl: 'client/photos/show.html',
            controller: 'PhotosShowController'
          }).

          when('/colors', {
            controller: 'ColorsController',
            templateUrl: 'client/colors.html'
          }).

          when('/admin/:path*?', {
            controller: 'AdminForwardController',
            template: " "
          }).

          when('/:id*/photo/:photo_id', {
            templateUrl: 'client/albums/show.html',
            controller: 'AlbumsShowController'
          }).

          when('/:id*', {
            templateUrl: 'client/albums/show.html',
            controller: 'AlbumsShowController'
          });

      $location.html5Mode(true).hashPrefix('!');

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
  ])
  .run(['$route', '$rootScope', '$location',
    function($route, $rootScope, $location){
      $rootScope.changes = 0;
      $rootScope.current_user = window.$clientApp.current_user;

      $rootScope.$on('$locationChangeStart', function(){
        if ($rootScope.changes) $('#yield').remove();

        if ($rootScope.changes < 2) $rootScope.changes++;
      });

      var original = $location.path;
        $location.path = function (path, reload) {
          if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
              $route.current = lastRoute;
              un();
            });
          }
          return original.apply($location, [path]);
        };
    }]);
