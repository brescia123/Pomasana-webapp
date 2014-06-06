'use strict';

angular.module('pomasanaAppApp')
    .controller('MainCtrl', function($scope, AuthService, $location, $routeParams, $rootScope, UserService, $resource, ErrorService, ToastService, baseUrl) {

        $scope.loginUrl = baseUrl + "/registration?redirect_url=http%3A%2F%2F127.0.0.1%3A9000%2F%23%2Fpersonal-page";

        if ($routeParams.access_token) {

            AuthService.login($routeParams.access_token);

            var userRes = $resource(baseUrl + '/users/me', {}, {
                getMe: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': $routeParams.access_token
                    }
                }
            })

            userRes.getMe(function(response) {
                $rootScope.currentUser = response.data;
                AuthService.setUser(response.data);
                ToastService.welcome();
            });

            //clean path
            $location.url($location.path());
        }

    });