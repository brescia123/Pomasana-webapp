angular.module('pomasanaAppApp')
    .factory('UserService', ['AuthService', '$resource',

        function(auth, $resource) {
            return $resource('http://localhost:8080/api/users/me', {}, {
                getMe: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }
                }
            })
        }
    ])