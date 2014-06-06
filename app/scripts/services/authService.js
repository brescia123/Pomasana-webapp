angular.module('pomasanaAppApp')
    .factory('AuthService', ['localStorageService',

        function(localStorageService) {
            return {

                getToken: function() {
                    return localStorageService.get('access_token');
                },

                getUser: function() {
                    return localStorageService.get('user');
                },

                setUser: function(user) {
                    return localStorageService.set('user', user);;
                },

                login: function(token) {
                    return localStorageService.set('access_token', token);
                },

                logout: function() {
                    localStorageService.remove('access_token');
                    localStorageService.remove('user');
                },

                isLogged: function() {
                    return localStorageService.get('access_token');
                }
            };
        }
    ])