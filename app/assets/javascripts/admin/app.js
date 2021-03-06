/*!
 * Admin angular application
 *
 * TODO: Validate slug uniqueness on clientside
 *
 *
 */

window.$adminApp = {current_user: null};

window.$adminApp.registry = [
  'templates',
  'ngRoute',
  'ngCookies',
  'ngAnimate',

  'directives',

  'adminControllers',
  'adminServices'
];

angular.module('adminApp', window.$adminApp.registry)
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
          templateUrl: 'admin/albums/index.html',
          reloadOnSearch: false
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


        when('/admin/users', {
          controller: 'UsersIndexController',
          templateUrl: 'admin/users/index.html'
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
  .run(['$rootScope', '$sce',
    function($rootScope, $sce){
      $rootScope.changes = 0;
      $rootScope.current_user = window.$adminApp.current_user;

      $rootScope.$on('$locationChangeStart', function(){
        if ($rootScope.changes) $('#yield').remove();

        if ($rootScope.changes < 2) $rootScope.changes++;
      });

      Dropzone.autoDiscover = false;

      $( window ).resize(function(){
        $('[data-resize=height]').each(function(){
          $this = $(this);
          $this.css('height', $this.width());
        });
      });

      $rootScope.alerts = window.$adminApp.flashes||[];

      $rootScope.alert = function(obj){
        if (obj.name){
          $rootScope.removeAlert(obj.name);
        }

        if ($rootScope.alerts.length >= 5) $rootScope.alerts.shift();

        obj.body = $sce.trustAsHtml(obj.body);

        $rootScope.alerts.push(obj);
      };

      $rootScope.removeAlert = function(name){
        $.each($rootScope.alerts, function(idx, alert){
          if (alert && alert.name == name) $rootScope.alerts.splice(idx, 1);
        })
      };
    }]);
