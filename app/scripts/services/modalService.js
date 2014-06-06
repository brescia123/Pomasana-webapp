'use strict';

angular.module('pomasanaAppApp')
    .factory('ModalService', ['$modal', '$window',

        function($modal, $window) {
            return {
                pomoTaskCreate: function(task) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomotask-create.html',
                        controller: 'CreateModalInstanceCtrl',
                        resolve: {
                            task: function() {
                                return task;
                            }
                        }
                    }).result;
                },

                pomoTaskModify: function(pomotask) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomotask-modify.html',
                        controller: 'ModifyModalInstanceCtrl',
                        resolve: {
                            pomotask: function() {
                                return pomotask;
                            }
                        }
                    }).result;
                },

                pomoTaskDetail: function(pomotask) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomotask-detail.html',
                        controller: 'DetailModalInstanceCtrl',
                        resolve: {
                            pomotask: function() {
                                return pomotask;
                            }
                        }
                    }).result;
                },

                pomoTaskDelete: function(pomotask) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomotask-delete.html',
                        controller: 'DeleteModalInstanceCtrl',
                        resolve: {
                            pomotask: function() {
                                return pomotask;
                            }
                        }
                    }).result;
                },

                pomodoroAdd: function(pomotask) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomodoro-add.html',
                        controller: 'AddPomodoroModalInstanceCtrl',
                        resolve: {
                            pomotask: function() {
                                return pomotask;
                            }
                        }
                    }).result;
                },

                pomodoroStart: function(pomotask) {

                    return $modal.open({
                        templateUrl: 'views/modals/pomodoro-start.html',
                        controller: 'StartPomodoroModalInstanceCtrl',
                        resolve: {
                            pomotask: function() {
                                return pomotask;
                            }
                        },
                        backdrop: 'static',
                        keyboard: false
                    }).result;
                }

            };
        }
    ])