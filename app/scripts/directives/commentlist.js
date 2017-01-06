'use strict';

/**
 * @ngdoc directive
 * @name shareCreationsApp.directive:commentList
 * @description
 * # commentList
 */
angular.module('shareCreationsApp')
  .directive('commentList', function () {
    return {
        templateUrl: '../views/directives/commentList.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            //console.log(scope.creation);
        },
        scope: {
            creation: '='
        },
        controller: ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.comment = {};

            $scope.comment.creation =  $scope.creation.id;

            $scope.addComment = function () {
                console.log($scope.comment);
                $http.post($rootScope.api + '/creations/comments', $scope.comment).then(function (res) {
                    $scope.creation.comments.unshift(res.data.comment);
                    $scope.comment.content = "";
                });
            };
        }]
    };
  });
