'use strict';

/**
 * @ngdoc directive
 * @name shareCreationsApp.directive:userCard
 * @description
 * # userCard
 */
angular.module('shareCreationsApp')
  .directive('userCard', function () {
      return {
          restrict: 'E',
          templateUrl: '../views/directives/userCard.html',
          scope: {
              name: '@',
              theme: '@'
          },
          controller: ['$scope', function ($scope) {
              $scope.theme = $scope.theme || 'default';
          }]
      }
  });
