'use strict';

angular.module('pomasanaAppApp')
    .controller('PomotaskCtrl', ['$scope', '$location', 'AuthService', 'TaskService', 'ErrorService', 'ToastService', 'PomotasksService', 'HelperService', 'ModalService',
        function($scope, $location, AuthService, TaskService, ErrorService, ToastService, PomotasksService, HelperService, ModalService) {


            //Init

            $scope.pomotasks = {};


            //Functions

            $scope.loadPomotasks = function() {
                if ($location.path() === "/pomotasks-todo") {
                    $scope.loadTodoPomotasks();
                }
                if ($location.path() === "/pomotasks-done") {
                    $scope.loadDonePomotasks();
                }
            }

            $scope.rate = 1;
            $scope.loadTodoPomotasks = function() {
                PomotasksService.getPomoTasks({
                        completed: 'false'
                    },
                    function(response) {
                        $scope.pomotasks = response.data;
                    },
                    function(error) {
                        ErrorService.handle(error);
                    });
            };

            $scope.loadDonePomotasks = function() {
                PomotasksService.getPomoTasks({
                        completed: 'true'
                    },
                    function(response) {
                        $scope.pomotasks = response.data;
                    },
                    function(error) {
                        ErrorService.handle(error);
                    });
            };

            $scope.completePomotask = function(pomotask) {

                var data = {
                    completed: true
                };

                PomotasksService.updatePomoTask({
                    id: pomotask.id
                }, data, function(response) {
                    $scope.loadPomotasks();
                    ToastService.pomotaskDone();
                }, function(error) {
                    ErrorService.handle(error);
                });
            };

            $scope.uncompletePomotask = function(pomotask) {

                var data = {
                    completed: false
                };

                PomotasksService.updatePomoTask({
                    id: pomotask.id
                }, data, function(response) {
                    $scope.loadPomotasks();
                    ToastService.pomotaskUndone();
                }, function(error) {
                    ErrorService.handle(error);
                });
            }

            $scope.deletePomotaskModal = function(pomotask) {
                ModalService.pomoTaskDelete(pomotask).then(function(argument) {
                    $scope.loadPomotasks();
                })
            }

            $scope.modifyPomotaskModal = function(pomotask) {
                ModalService.pomoTaskModify(pomotask).then(function(argument) {
                    $scope.loadPomotasks();
                })
            }

            $scope.detailPomotaskModal = function(pomotask) {
                ModalService.pomoTaskDetail(pomotask);
            }

            $scope.addPomodoroModal = function(pomotask) {
                ModalService.pomodoroAdd(pomotask).then(function(argument) {
                    $scope.loadPomotasks();
                })
            }

            $scope.startPomodoroModal = function(pomotask) {
                ModalService.pomodoroStart(pomotask).then(function(argument) {
                    $scope.loadPomotasks();
                })
            }



            $scope.progress = function(pomotask) {
                return HelperService.getProgress(pomotask);
            };


            $scope.usedPom = function(pomotask) {
                return HelperService.getUsedPom(pomotask);
            };

            $scope.estPom = function(pomotask) {
                return HelperService.getEstPom(pomotask);
            };

            $scope.maxProgress = function(pomotask) {
                return HelperService.getMaxProgress(pomotask);
            };





            //Start
            $scope.loadPomotasks();



        }
    ]);