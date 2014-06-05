'use strict';

angular.module('pomasanaAppApp')
    .factory('ToastService', ['$rootScope',

        function($rootScope) {
            return {
                welcome: function() {
                    toastr.info('Welcome ' + $rootScope.currentUser.name + '!');
                },
                pomotaskCreated: function() {
                    toastr.error('The pomotask has been created! ', 'OK');
                },
                pomotaskDeleted: function() {
                    toastr.error('The pomotask has been deleted!  ', 'OK');
                },
                pomotaskUpdated: function() {
                    toastr.error('The pomotask has been modified! ', 'OK');
                },
                pomotaskDone: function() {
                    toastr.error('The pomotask is done. ', 'Good work!');
                },
                pomotaskUndone: function() {
                    toastr.error('There pomotask is todo. ', 'Need extra work!');
                },
                pomodoroAdded: function() {
                    toastr.error('A pomodoro has been added. ', 'OK');
                },
                pomodoroFinished: function() {
                    toastr.error('The pomodoro finished, now rest for five minutes!', 'Good job!');
                }
            };
        }
    ])