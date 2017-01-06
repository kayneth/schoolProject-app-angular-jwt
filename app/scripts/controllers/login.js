'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('LoginCtrl',['$scope', '$http', '$rootScope', '$mdDialog', '$timeout', '$location', 'scAuthManager', function ($scope, $http, $rootScope, $mdDialog, $timeout, $location, scAuthManager) {

      $scope.user = {
          '_username' : "",
          '_password' : ""
      };

      $scope.registeringUser = {};

      $scope.loader = false;

      $scope.loginApi = function() {
          console.log($scope.user);
          $scope.loader = true;

          scAuthManager.login($scope.user);

          $scope.loader = false;
      };

      $scope.register = function () {
          $http.post($rootScope.api + '/register/', $scope.registeringUser, {skipAuthorization: true}).then(function success(res) {
              console.log(res);
              $scope.user._username = $scope.registeringUser.username;
              $scope.user._password = $scope.registeringUser.plainPassword.first;
              $scope.loginApi();
          }, function error(res) {
              console.log(res);
          });
      }
  }]);
