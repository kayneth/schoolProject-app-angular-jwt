'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('AdminCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

      $scope.invitation = {};
      $scope.invitations = {};
      $scope.users = {};

      $http.get($rootScope.api+'/invitations').then(function(res) {
          $scope.invitations = res.data.invitations;
          console.log(res);
      });

      $http.get($rootScope.api+'/users').then(function(res) {
          $scope.users = res.data.users;
          console.log(res);
      });

      $scope.sendInvitation = function () {
          $http.post($rootScope.api + '/invitations', $scope.invitation).then(function success(res) {

              console.log(res);
              $scope.invitations.unshift(res.data.invitation);

          }, function error(res) {
              console.log(res);
          });
      };

  }]);
