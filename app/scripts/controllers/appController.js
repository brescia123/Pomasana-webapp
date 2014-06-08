'use strict';

angular.module('pomasanaAppApp')
    .controller('AppController', ['$scope', 'AuthService', '$location', '$routeParams', '$rootScope', 'UserService', '$window',
        function($scope, AuthService, $location, $routeParams, $rootScope, UserService, $window) {

            $scope.tabIsActive = function(tab) {
                return tab === $location.path();
            };

            $scope.isLogged = function() {
                return AuthService.isLogged();
            };


            $scope.logout = function() {
                AuthService.logout();
                $location.path("/");
                $window.location.reload();
            };


        }
    ]);