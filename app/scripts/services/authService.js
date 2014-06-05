angular.module('pomasanaAppApp')
    .factory('AuthService', ['localStorageService',

        function(localStorageService) {
            return {

                getToken: function() {
                    return localStorageService.get('access_token');
                },

                login: function(token) {
                    return localStorageService.set('access_token', token);
                },

                logout: function() {
                    localStorageService.remove('access_token');
                },

                isLogged: function() {
                    return localStorageService.get('access_token');
                }
            };
        }
    ])