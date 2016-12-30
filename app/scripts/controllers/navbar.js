'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('NavbarCtrl', ['$scope', '$http', '$rootScope', '$mdDialog', '$timeout', '$location', '$mdSidenav', function ($scope, $http, $rootScope, $mdDialog, $timeout, $location, $mdSidenav) {

      $scope.creation = {};
      $scope.categories = null;

      $scope.toggleSidenav = function () {
          return $mdSidenav('left').toggle();
      };

      $scope.showAddCrea = function($event){
          $mdDialog.show({
              clickOutsideToClose: true,
              scope: $scope,
              preserveScope: true,
              templateUrl: 'views/addcreation.html',
              controller: ['$scope', '$mdDialog', function DialogController($scope, $mdDialog) {
                  $scope.closeDialog = function() {
                      $mdDialog.hide();
                  };
              }]
          });
      };

      $scope.addCreation = function() {
          console.log($scope.creation);
          $http.post($rootScope.api + '/creations', $scope.creation).then(function (res) {
              $scope.creation = res.data.creation;
              console.log(res);
          });
      };

      $scope.loadCategories = function () {
          $http.get($rootScope.api + '/categories').then(function (res) {
              $scope.categories = res.data.category;

              console.log(res);
          });
      };

      $scope.logout = function () {
          localStorage.removeItem("JWT");
          localStorage.removeItem("refresh_token");
          $location.path('/login');
          $rootScope.$broadcast('disconnected');
          $rootScope.isAuthenticated = false;
      };
  }]);
