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
        'progressButton',
        'angularSpinner'
    ])
    .value('baseUrl', 'http://pomasana.appspot.com/api')
    .value('redirectBaseUrl', 'http%3A%2F%2Fpomasana.herokuapp.com%2F%23%2F')
//.value('redirectBaseUrl', 'http%3A%2F%2F127.0.0.1%3A9000%2F%23%2F')
.config(['$routeProvider',
    function($routeProvider) {

        var loginRequired = ['$location', '$q', 'AuthService',
            function($location, $q, AuthService) {
                var deferred = $q.defer();

                if (!AuthService.isLogged()) {
                    deferred.reject()
                    $location.path('/');
                } else {
                    deferred.resolve()
                }

                return deferred.promise;
            }
        ];

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    loggedHome: ['$location', '$q', 'AuthService',
                        function($location, $q, AuthService) {
                            var deferred = $q.defer();

                            if (AuthService.isLogged()) {
                                deferred.reject()
                                $location.path('/pomotasks-todo');
                            } else {
                                deferred.resolve()
                            }

                            return deferred.promise;
                        }
                    ]
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
    }
])
    .config(['localStorageServiceProvider',
        function(localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('pomasana_');
        }
    ])
    .run(['$rootScope', '$location', 'UserService', 'AuthService', 'ErrorService',
        function($rootScope, $location, UserService, AuthService, ErrorService) {

            $rootScope.currentUser = AuthService.getUser();

            if (AuthService.isLogged() && !AuthService.getUser()) {
                UserService.getMe(function(response) {
                    AuthService.setUser(response.data);
                    $rootScope.currentUser = response.data;
                }, function(error) {
                    ErrorService.handle(error);
                })
            }
        }
    ]);