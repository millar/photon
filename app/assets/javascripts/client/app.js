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
          when('/colors', {
            controller: 'ColorsController',
            templateUrl: 'client/colors.html'
          }).
          when('/admin/:path*?', {
            controller: 'AdminForwardController',
            template: " "
          });

      $location.html5Mode(true).hashPrefix('!');

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
  ])
  .run(['$rootScope',
    function($rootScope){
      $rootScope.changes = 0;
      $rootScope.current_user = window.$clientApp.current_user;

      $rootScope.$on('$locationChangeStart', function(){
        if ($rootScope.changes) $('#yield').remove();

        if ($rootScope.changes < 2) $rootScope.changes++;
      });
    }]);
