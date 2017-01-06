'use strict';

/**
 * @ngdoc overview
 * @name shareCreationsApp
 * @description
 * # shareCreationsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('shareCreationsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'angular-jwt',
      'base64'
  ])
  .config(function ($httpProvider, $routeProvider, jwtOptionsProvider, jwtInterceptorProvider, $locationProvider, $mdIconProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
          data: {
            requiresLogin: true
          }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/creation/:slug', {
        templateUrl: 'views/creation.html',
        controller: 'CreationCtrl',
        controllerAs: 'creation',
          data: {
              requiresLogin: true
          }
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .otherwise({
        redirectTo: '/'
      });

      $mdIconProvider.defaultIconSet('../icons/mdi.svg');

      jwtOptionsProvider.config({
          whiteListedDomains: ['127.0.0.1', 'localhost', 'http://api.sharecrea.iut-lepuy.fr/'],
          unauthenticatedRedirectPath: '/login',

          tokenGetter: ['options','$http', 'jwtHelper', 'scAuthManager', function(options, $http, jwtHelper, scAuthManager) {
              // Skip authentication for any requests ending in .html
              if (options && options.url.substr(options.url.length - 5) === '.html') {
                  return null;
              }

              var jwt = localStorage.getItem('JWT');
              var refreshToken = localStorage.getItem('refresh_token');

              // if(jwtHelper.isTokenExpired(jwt))
              // {
              //     // This is a promise of a JWT id_token
              //     return scAuthManager.refreshToken(refreshToken);
              // } else {
              //     return jwt;
              // }
              return jwt;
          }]


      });

      $httpProvider.interceptors.push('jwtInterceptor');

      // use the HTML5 History API
      //$locationProvider.html5Mode(true);
  });

app.run(['$rootScope', '$location', 'jwtHelper', 'scAuthManager', function($rootScope, $location, jwtHelper, scAuthManager) {

    //$rootScope.apiRoot = "http://127.0.0.1:8000";
    $rootScope.apiRoot = "http://api.sharecrea.iut-lepuy.fr/web/app_dev.php";
    $rootScope.api = $rootScope.apiRoot+"/api";

    scAuthManager.initialize();

    $rootScope.$on('tokenHasExpired', function() {
        scAuthManager.refreshToken();
    });

    $rootScope.$on('$locationChangeStart', function(event) {
        //event.preventDefault();
        var token = localStorage.getItem('JWT');
        var refreshToken = localStorage.getItem('refresh_token');
        if (token && token != "undefined") {
            if (!jwtHelper.isTokenExpired(token)) {

            } else {
                if (refreshToken) {
                    scAuthManager.refreshToken(refreshToken);
                } else {
                    $location.path('/login');
                }
            }
        } else if (refreshToken) {
            scAuthManager.refreshToken(refreshToken);
        } else {
            $location.path('/login');
        }
    });

}]);