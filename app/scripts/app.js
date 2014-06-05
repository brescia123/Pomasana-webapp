'use strict';

angular
    .module('pomasanaAppApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'LocalStorageModule',
        'angular-loading-bar',
        'mgcrea.ngStrap'
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
            .when('/inventory', {
                templateUrl: 'views/app/inventory.html',
                controller: 'MainCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(['cfpLoadingBarProvider',
        function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = true;
        }
    ])
    .config(['localStorageServiceProvider',
        function(localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('pomasana_');
        }
    ])
    .run(function($rootScope, UserService, AuthService) {
        if (AuthService.isLogged()) {
            UserService.getMe(function(response) {
                $rootScope.currentUser = response.data;
            })
        }
    });