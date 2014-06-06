'use strict';

angular.module('pomasanaAppApp')
    .factory('TaskService', ['AuthService', '$resource', 'baseUrl',
        function(auth, $resource, baseUrl) {
            return $resource(baseUrl + '/asana/projects/:id', {
                id: '@id'
            }, {
                query: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }
                },
                getTasks: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }

                }

            })
        }
    ])