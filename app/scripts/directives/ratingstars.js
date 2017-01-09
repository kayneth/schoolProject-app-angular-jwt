'use strict';

/**
 * @ngdoc directive
 * @name shareCreationsApp.directive:ratingStars
 * @description
 * # ratingStars
 */
angular.module('shareCreationsApp')
  .directive('ratingStars', function () {
    return {
        templateUrl: 'views/directives/ratingStars.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            //console.log(scope.creation);
        },
        scope: {
            creation: '='
        },
        controller: ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.score = {};

            $scope.score.creation =  $scope.creation.id;

            $scope.$watch('score.note', addScore);

            function addScore () {
                if(!angular.isDefined($scope.score.note)) {
                    return;
                }
                console.log($scope.score);
                $http.post($rootScope.api + '/creations/scores', $scope.score).then(function (res) {
                    console.log(res);
                    $scope.creation.scoreAverage = res.data.score.creation.scoreAverage;
                    $scope.error = "Merci pour la note de "+ res.data.score.note +"/5 :)";
                }, function error (res){
                    $scope.error = res.data.errors.global[0];
                    console.log($scope.error)
                });
            }
        }]
    };
  });
