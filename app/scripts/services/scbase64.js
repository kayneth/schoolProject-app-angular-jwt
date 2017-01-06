'use strict';

/**
 * @ngdoc service
 * @name shareCreationsApp.scBase64
 * @description
 * # scBase64
 * Service in the shareCreationsApp.
 * Documentation : https://github.com/ninjatronic/angular-base64
 */
angular.module('shareCreationsApp')
  .service('scBase64', ['$base64', '$rootScope', function ($base64, $rootScope) {
      var scope = this;

      scope.encode =  function(toEncode) {
          return $base64.encode(toEncode);
      };

      scope.decode = function(toDecode) {
          return $base64.decode(toDecode);
      }
  }]);
