'use strict';

/**
 * @ngdoc function
 * @name shareCreationsApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the shareCreationsApp
 */
angular.module('shareCreationsApp')
  .controller('NavbarCtrl', ['$scope', '$http', '$rootScope', '$mdDialog', '$timeout', '$location', '$mdSidenav', 'scAuthManager', function ($scope, $http, $rootScope, $mdDialog, $timeout, $location, $mdSidenav, scAuthManager) {

      $scope.creation = {};
      $scope.categories = null;
      $scope.isAdmin = scAuthManager.isAdmin();
      console.log($scope.isAdmin);

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
                  $scope.toggleSidenav();
                  $scope.closeDialog = function() {
                      $mdDialog.hide();
                  };
              }]
          });
      };

      $scope.addCreation = function() {
          console.log($scope.creation);
          var payload = new FormData();
          payload.append("title", $scope.creation.title);
          payload.append("link", $scope.creation.link);
          payload.append("description", $scope.creation.description);
          payload.append("category", $scope.creation.category);
          payload.append("image", $scope.creation.image);
          $http({
              url: $rootScope.api + '/creations',
              method: 'POST',
              data: payload,
              //assign content-type as undefined, the browser
              //will assign the correct boundary for us
              headers: { 'Content-Type': undefined},
              //prevents serializing payload.  don't do it.
              transformRequest: angular.identity
          }).then(function (res) {
              $scope.creation = res.data.creation;
              console.log(res);
          });
      };

      $scope.loadCategories = function () {
          $http.get($rootScope.api + '/categories').then(function (res) {
              $scope.categories = res.data.category;
          });
      };

      $scope.logout = function () {
          $scope.toggleSidenav();
          scAuthManager.logout();
      };
  }]);
