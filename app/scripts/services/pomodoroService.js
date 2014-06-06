'use strict';

angular.module('pomasanaAppApp')
    .factory('PomodoroService', ['AuthService', '$resource', 'baseUrl',

        function(auth, $resource, baseUrl, $window) {
            var resource = $resource(baseUrl + '/pomodori/:id', {
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
                getPomodori: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }

                },
                updatePomodoro: {
                    method: 'PUT',
                    isArray: false,
                    headers: {
                        'Authorization': auth.getToken()
                    }

                },
                createPomodoro: {
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