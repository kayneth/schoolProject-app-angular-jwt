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
    'angular-jwt'
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
      .otherwise({
        redirectTo: '/'
      });

      $mdIconProvider.defaultIconSet('../icons/mdi.svg');

      jwtOptionsProvider.config({
          whiteListedDomains: ['127.0.0.1', 'localhost'],
          unauthenticatedRedirectPath: '/login',

          tokenGetter: ['options','$http', 'jwtHelper', function(options, $http, jwtHelper) {
              // Skip authentication for any requests ending in .html
              if (options && options.url.substr(options.url.length - 5) === '.html') {
                  return null;
              }

              var jwt = localStorage.getItem('JWT');
              var refreshToken = localStorage.getItem('refresh_token');

              if(jwt === null || jwt === "undefined")
              {
                  return $http({
                      url: 'http://127.0.0.1:8000/api/token/refresh',
                      // This will not send the JWT for this call
                      skipAuthorization: true,
                      method: 'POST',
                      refresh_token : refreshToken,
                      data: {"refresh_token" : refreshToken}
                  }).then(function(response) {
                      localStorage.setItem('JWT', response.data.jwt);
                      return jwt;
                  });
              }
              else if(jwtHelper.isTokenExpired(jwt))
              {
                  console.log('test jwt');
                  // This is a promise of a JWT id_token
                  return $http({
                      url: 'http://127.0.0.1:8000/api/token/refresh',
                      // This will not send the JWT for this call
                      skipAuthorization: true,
                      method: 'POST',
                      refresh_token : refreshToken,
                      data: {"refresh_token" : refreshToken}
                  }).then(function(response) {
                      localStorage.setItem('JWT', response.data.jwt);
                      return jwt;
                  });
              } else {
                  return jwt;
              }
          }]


      });

      $httpProvider.interceptors.push('jwtInterceptor');

      // use the HTML5 History API
      //$locationProvider.html5Mode(true);
  });

app.run(['$rootScope', 'authManager', function($rootScope, authManager) {

    $rootScope.api = "http://127.0.0.1:8000/api";

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    $rootScope.$on('tokenHasExpired', function() {
        //window.alert('Your session has expired!');
    });

}]);