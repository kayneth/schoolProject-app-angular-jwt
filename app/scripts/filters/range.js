'use strict';

/**
 * @ngdoc filter
 * @name shareCreationsApp.filter:range
 * @function
 * @description
 * # range
 * Filter in the shareCreationsApp.
 */
angular.module('shareCreationsApp')
  .filter('range', function () {
      return function(input, total) {
          total = parseInt(total);

          for (var i=0; i<total; i++) {
              input.push(i);
          }

          return input;
      };
  });
