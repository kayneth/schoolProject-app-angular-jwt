'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:CreationCtrl
 * @description
 * # CreationCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('CreationCtrl',['$scope', '$http', '$rootScope', '$routeParams', function ($scope, $http, $rootScope, $routeParams) {
      $scope.creation = {};
      $scope.params = $routeParams;
      $scope.ready = false;

      $http.get($rootScope.api+'/creations/'+$scope.params.slug).then(function(res) {
          $scope.creation = res.data.creation;
          //console.log(res);
          $scope.ready = true;
      });
  }]);
