'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('MainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
      $scope.creations = {};

      $http.get($rootScope.api+'/creations').then(function(res) {
          $scope.creations = res.data.creations;
      });
  }]);

