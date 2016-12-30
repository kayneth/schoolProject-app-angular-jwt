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
      $scope.comment = {};

      $http.get($rootScope.api+'/creations/'+$scope.params.slug).then(function(res) {
          $scope.creation = res.data.creation;
          console.log(res);
          $scope.comment.creation =  $scope.creation.id;
      });

      $scope.addComment = function () {
          console.log($scope.comment);
          $http.post($rootScope.api + '/creations/comments', $scope.comment).then(function (res) {
              console.log(res);
              $scope.creation.comments.unshift(res.data.comment);
              $scope.comment.content = "";
          });
      };
  }]);
