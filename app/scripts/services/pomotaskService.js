'use strict';

angular.module('pomasanaAppApp')
    .factory('PomotasksService', ['AuthService', '$resource', baseUrl,

        function(auth, $resource, $window) {
            var resource = $resource(baseUrl + '/pomotasks/:id', {
                pomotaskId: '@id'
            }, {
                get: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }
                },
                remove: {
                    method: 'DELETE',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }
                },
                getPomoTasks: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }

                },
                updatePomoTask: {
                    method: 'PUT',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }

                },
                createPomoTask: {
                    method: 'POST',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }
                }

            });
            return resource;
        }
    ])