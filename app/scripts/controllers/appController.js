'use strict';

angular.module('pomasanaAppApp')
    .controller('AppController', function($scope, AuthService, $location, $routeParams, $rootScope, UserService, $window) {

        $scope.tabIsActive = function(tab) {
            return tab === $location.path();
        }



        $scope.logout = function() {
            AuthService.logout();
            $location.path("/");
            $window.location.reload();
        }


    });