 'use strict';

 angular.module('pomasanaAppApp')
     .factory('PomoTaskPomService', ['AuthService', '$resource', 'baseUrl', '$window',

         function(auth, $resource, baseUrl, $window) {
             var resource = $resource(baseUrl + '/pomotasks/:id/pomodori', {
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