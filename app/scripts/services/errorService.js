'use strict';

angular.module('pomasanaAppApp')
    .factory('ErrorService', [

        function() {
            return {
                handle: function(error) {

                    if (error.status === 0) {
                        toastr.error('There was a problem, check the connectivity. ', 'Ops!');
                        return;
                    }

                    if (error.status === 500) {
                        toastr.error('The server has some problem. Check again later.', 'Ops!');
                        return;
                    }

                    if (error.status === 403) {
                        toastr.error('You are not authorized.', '403');
                        return;
                    }

                    if (error.status === 404) {
                        toastr.error('The resource was not found. ', '404');
                        return;
                    }

                    if (error.status === 405) {
                        toastr.error('Method Not Allowed ', '405');
                        return;
                    }

                    toastr.error('There was a problem. ', 'Ops!');

                }
            };
        }
    ])