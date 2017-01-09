'use strict';

/**
 * @ngdoc directive
 * @name shareCreationsApp.directive:regularCard
 * @description
 * # regularCard
 */
angular.module('shareCreationsApp')
  .directive('regularCard', function () {
      return {
          restrict: 'E',
          templateUrl: 'views/directives/regularCard.html',
          scope: {
              name: '@'
          }
      }
  });
