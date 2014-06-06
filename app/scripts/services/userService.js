angular.module('pomasanaAppApp')
    .factory('UserService', ['AuthService', '$resource', 'baseUrl',

        function(auth, $resource, baseUrl) {
            return $resource(baseUrl + '/users/me', {}, {
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