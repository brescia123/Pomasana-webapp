'use strict';

angular.module('pomasanaAppApp')
    .factory('ToastService', ['$rootScope',

        function($rootScope) {
            return {
                welcome: function() {
                    toastr.info('Welcome ' + $rootScope.currentUser.name + '!');
                },
                pomotaskCreated: function() {
                    toastr.success('The pomotask has been created! ', 'OK');
                },
                pomotaskDeleted: function() {
                    toastr.success('The pomotask has been deleted!  ', 'OK');
                },
                pomotaskUpdated: function() {
                    toastr.success('The pomotask has been modified! ', 'OK');
                },
                pomotaskDone: function() {
                    toastr.success('The pomotask is done. ', 'Good work!');
                },
                pomotaskUndone: function() {
                    toastr.success('There pomotask is todo. ', 'Need extra work!');
                },
                pomodoroAdded: function() {
                    toastr.success('The pomodoro has been added. ', 'OK');
                },
                pomodoroFinished: function() {
                    toastr.success('The pomodoro finished, now rest for five minutes!', 'Good job!');
                }
            };
        }
    ])