'use strict';

angular.module('pomasanaAppApp')
    .controller('CreateModalInstanceCtrl', ['$scope', '$modalInstance', 'PomotasksService', '$window', 'task', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, PomotasksService, $window, task, ErrorService, ToastService) {

            $scope.task = task;


            $scope.data = {
                id: task.id,
                completed: false,
                estimatedPomodori: 0
            }


            $scope.ok = function(button) {

                button.progressStart();

                PomotasksService.createPomoTask($scope.data, function(response) {
                    button.progressFinish();
                    $window.setTimeout(function() {
                        ToastService.pomotaskCreated();
                        $modalInstance.close();
                    }, 1000);
                }, function(error) {
                    button.progressFinish();
                    ErrorService.handle(error);
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

        }
    ])
    .controller('AddPomodoroModalInstanceCtrl', ['$scope', '$modalInstance', 'PomodoroService', '$window', 'pomotask', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, PomodoroService, $window, pomotask, ErrorService, ToastService) {

            $scope.pomotask = pomotask;


            $scope.data = {
                pomoTaskId: pomotask.id,
                extInterrupt: 0,
                intInterrupt: 0,
                notes: ""
            }

            $scope.incrementIntInterrupt = function() {
                $scope.data.intInterrupt++;
            }

            $scope.incrementExtInterrupt = function() {
                $scope.data.extInterrupt++;
            }

            $scope.decrementIntInterrupt = function() {
                $scope.data.intInterrupt++;
            }

            $scope.decrementExtInterrupt = function() {
                $scope.data.extInterrupt++;
            }


            $scope.ok = function(button) {

                button.progressStart();

                PomodoroService.createPomodoro($scope.data, function(response) {
                    button.progressFinish();
                    $window.setTimeout(function() {
                        ToastService.pomodoroAdded();
                        $modalInstance.close();
                    }, 1000);
                }, function(error) {
                    button.progressFinish();
                    ErrorService.handle(error);
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

        }
    ])
    .controller('StartPomodoroModalInstanceCtrl', ['$scope', '$modalInstance', 'PomodoroService', '$window', 'pomotask', '$timeout', '$interval', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, PomodoroService, $window, pomotask, $timeout, $interval, ErrorService, ToastService) {

            $scope.currentTime = {
                bigTime: 1499,
                secsText: '00',
                minsText: '25',
                progress: 0
            };


            $scope.data = {
                pomoTaskId: pomotask.id,
                extInterrupt: 0,
                intInterrupt: 0,
                notes: ""
            }

            var timerWorker;
            $scope.pomotask = pomotask;
            $scope.finished = false;
            $scope.running = false;


            var initWorker = function() {
                timerWorker = new Worker('timerWorker.js');
                timerWorker.addEventListener('message', function(e) {
                    $scope.currentTime = e.data;

                    if ($scope.currentTime.bigTime === 0) {
                        $scope.finished = true;
                        $scope.running = false;
                        ToastService.pomodoroFinished();
                    }

                    $scope.$apply();
                }, false);
            }


            $scope.startTimer = function() {
                initWorker();
                $scope.running = true;
                timerWorker.postMessage({
                    'cmd': 'start'
                });
            }

            $scope.resetTimer = function() {

                timerWorker.postMessage({
                    'cmd': 'stop'
                });

                $scope.currentTime = {
                    bigTime: 1499,
                    secsText: '00',
                    minsText: '25',
                    progress: 0
                };

                $scope.finished = false;
                $scope.running = false;

            }


            $scope.incrementIntInterrupt = function() {
                $scope.data.intInterrupt++;
            }

            $scope.incrementExtInterrupt = function() {
                $scope.data.extInterrupt++;
            }

            $scope.decrementIntInterrupt = function() {
                $scope.data.intInterrupt--;
            }

            $scope.decrementExtInterrupt = function() {
                $scope.data.extInterrupt--;
            }


            $scope.ok = function(button) {

                button.progressStart();

                PomodoroService.createPomodoro($scope.data, function(response) {
                    button.progressFinish();
                    $window.setTimeout(function() {
                        ToastService.pomodoroAdded();
                        $modalInstance.close();
                    }, 1000);
                }, function(error) {
                    button.progressFinish();
                    ErrorService.handle(error);
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };



        }
    ])
    .controller('DetailModalInstanceCtrl', ['$scope', '$modalInstance', '$window', 'pomotask', 'PomoTaskPomService', 'HelperService', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, $window, pomotask, PomoTaskPomService, HelperService, ErrorService, ToastService) {

            $scope.pomodori = {};
            $scope.pomotask = pomotask;

            PomoTaskPomService.get({
                id: pomotask.id
            }, {}, function(response) {
                $scope.pomodori = response.data;
            }, function(error) {
                ErrorService.handle(error);
                $modalInstance.close();
            })


            $scope.estimates = HelperService.getEstimates(pomotask);


            $scope.usedPom = function(pomotask) {
                return HelperService.getUsedPom(pomotask);
            };

            $scope.estPom = function(pomotask) {
                return HelperService.getEstPom(pomotask);
            };

            $scope.maxProgress = function(pomotask) {
                return HelperService.getMaxProgress(pomotask);
            };

            $scope.lastEst = function(pomotask) {
                return HelperService.getLastEst(pomotask);
            };


            $scope.ok = function() {
                $modalInstance.close();
            };




        }
    ])
    .controller('ModifyModalInstanceCtrl', ['$scope', '$modalInstance', '$window', 'pomotask', 'PomotasksService', 'ErrorService', 'ToastService', 'HelperService',
        function($scope, $modalInstance, $window, pomotask, PomotasksService, ErrorService, ToastService, HelperService) {

            $scope.pomotask = pomotask;


            $scope.data = {
                estimatedPomodori: HelperService.getLastEst(pomotask),
                name: pomotask.name
            };


            $scope.ok = function(button) {

                button.progressStart();

                PomotasksService.updatePomoTask({
                    id: pomotask.id
                }, $scope.data, function(response) {
                    button.progressFinish();
                    $window.setTimeout(function() {
                        ToastService.pomotaskModified();
                        $modalInstance.close();
                    }, 1000);
                }, function(error) {
                    button.progressFinish();
                    ErrorService.handle(error);
                });
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            }

        }
    ])
    .controller('DeleteModalInstanceCtrl', ['$scope', '$modalInstance', '$window', 'pomotask', 'PomotasksService', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, $window, pomotask, PomotasksService, ErrorService, ToastService) {

            $scope.pomotask = pomotask;

            $scope.ok = function(button) {

                button.progressStart();

                PomotasksService.remove({
                        id: pomotask.id
                    },
                    function(response) {
                        button.progressFinish();
                        $window.setTimeout(function() {
                            ToastService.pomotaskDeleted()
                            $modalInstance.close();
                        }, 1000);
                    }, function(error) {
                        button.progressFinish();
                        ErrorService.handle(error)
                    });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

        }
    ]);