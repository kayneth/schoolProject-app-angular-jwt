'use strict';

/**
 * @ngdoc service
 * @name shareCreationsApp.scAuthManager
 * @description
 * # scAuthManager
 * Service in the shareCreationsApp.
 */
angular.module('shareCreationsApp')
  .service('scAuthManager', ['$http', '$rootScope', 'authManager', 'jwtHelper', '$location', function ($http, $rootScope, authManager,jwtHelper, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var scope = this;
    scope.token = localStorage.getItem('JWT');
    //scope.expTime = jwtHelper.getTokenExpirationDate(scope.token);

    scope.initialize = function () {
      authManager.checkAuthOnRefresh();
      authManager.redirectWhenUnauthenticated();
    };

    scope.refreshToken = function (refreshToken) {
      $http({
        url: $rootScope.api+'/token/refresh',
        skipAuthorization: true,
        method: 'POST',
        refresh_token : refreshToken,
        data: {"refresh_token" : refreshToken}
      }).then(function(res) {
            var jwt = res.data.token;

          jwtHelper.getTokenExpirationDate(jwt);
            localStorage.setItem('JWT', res.data.token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('roles', res.data.data.roles);
            return jwt;
      });
    };

    scope.login = function (user) {

        $http.post($rootScope.api + '/login_check', user, {skipAuthorization: true}).then(function success(res) {
            localStorage.setItem("JWT", res.data.token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            //localStorage.setItem('roles', res.data.data.roles);
            console.log(res);
            $rootScope.$broadcast('authenticated');
            $rootScope.isAuthenticated = true;
            $location.path('/');
        }, function error(res) {
            console.log(res);
        });
    };

    scope.logout = function () {
        localStorage.removeItem("JWT");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem('roles');
        $location.path('/login');
        $rootScope.$broadcast('unauthenticated');
        $rootScope.isAuthenticated = false;
    };

    scope.isAdmin = function () {
        try {
            var roles = jwtHelper.decodeToken(scope.token).roles;
        }catch (e){

        }

        if(roles != null)
        {
            var hasRoleAdmin = false;

            angular.forEach(roles, function(value, key) {
                if ( value == "ROLE_ADMIN") {
                    hasRoleAdmin =  true;
                }
            });

            return hasRoleAdmin;
        }

        return false;
    }


  }]);
