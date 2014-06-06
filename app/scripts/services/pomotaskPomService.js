 'use strict';

 angular.module('pomasanaAppApp')
     .factory('PomoTaskPomService', ['AuthService', '$resource',

         function(auth, $resource, $window) {
             var resource = $resource('http://localhost:8080/api/pomotasks/:id/pomodori', {
                 pomotaskId: '@id'
             }, {
                 get: {
                     method: 'GET',
                     isArray: false,
                     headers: {
                         'Authorization': auth.getToken()
                     }
                 }

             });
             return resource;
         }
     ])