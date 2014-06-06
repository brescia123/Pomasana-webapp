'use strict';

angular
    .module('pomasanaAppApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'LocalStorageModule',
        'angular-loading-bar',
        'mgcrea.ngStrap',
        'ui.bootstrap',
        'progressButton'
    ])
    .value('baseUrl', 'http://localhost:8080/api')
    .config(function($routeProvider) {

        var loginRequired = function($location, $q, AuthService) {
            var deferred = $q.defer();

            if (!AuthService.isLogged()) {
                deferred.reject()
                $location.path('/');
            } else {
                deferred.resolve()
            }

            return deferred.promise;
        }

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    loggedHome: function($location, $q, AuthService) {
                        var deferred = $q.defer();

                        if (AuthService.isLogged()) {
                            deferred.reject()
                            $location.path('/inventory');
                        } else {
                            deferred.resolve()
                        }

                        return deferred.promise;
                    }
                }
            })
            .when('/personal-page', {
                templateUrl: 'views/personal-page.html',
                controller: 'MainCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/pomotasks-todo', {
                templateUrl: 'views/app/pomotasks-todo.html',
                controller: 'PomotaskCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/pomotasks-done', {
                templateUrl: 'views/app/pomotasks-done.html',
                controller: 'PomotaskCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/inventory', {
                templateUrl: 'views/app/inventory.html',
                controller: 'InventoryCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(['localStorageServiceProvider',
        function(localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('pomasana_');
        }
    ])
    .run(function($rootScope, $location, UserService, AuthService, ErrorService) {

        $rootScope.currentUser = AuthService.getUser();

        if (AuthService.isLogged() && !AuthService.getUser()) {
            UserService.getMe(function(response) {
                AuthService.setUser(response.data);
                $rootScope.currentUser = response.data;
            }, function(error) {
                ErrorService.handle(error);
            })
        }
    });