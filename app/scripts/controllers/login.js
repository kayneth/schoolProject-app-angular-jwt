'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('LoginCtrl',['$scope', '$http', '$rootScope', '$mdDialog', '$timeout', '$location', function ($scope, $http, $rootScope, $mdDialog, $timeout, $location) {

      $scope.user = {
          '_username' : "Kayneth",
          '_password' : "lol"
      };

      $scope.loader = false;

      $scope.loginApi = function() {
          console.log($scope.user);
          $scope.loader = true;
          $http.post($rootScope.api + '/login_check', $scope.user, {skipAuthorization: true}).then(function success(res) {
              localStorage.setItem("JWT", res.data.token);
              localStorage.setItem("refresh_token", res.data.refresh_token);
              console.log(res);
              $rootScope.$broadcast('authenticated');
              $rootScope.isAuthenticated = true;
              $location.path('/');
              $scope.loader = false;
          }, function error(res) {
              console.log(res);
              $scope.loader = false;
          });
      };
  }]);
