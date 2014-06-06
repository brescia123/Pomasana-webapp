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

            $scope.pomotask = pomotask;
            $scope.finished = false;
            $scope.running = false;

            $scope.secsText = '00';
            $scope.minsText = '25';

            var bigTime = 1499;
            $scope.progress = 0;
            var secs;
            var mins;

            var countdownID;


            var counter = function counter() {

                mins = Math.floor(bigTime / 60);
                secs = bigTime - mins * 60;

                $scope.secsText = (secs < 10 ? '0' : '') + secs;
                $scope.minsText = (mins < 10 ? '0' : '') + mins;

                if (bigTime === 0) {
                    $interval.cancel(countdownID);
                    $scope.finished = true;
                    $scope.running = false;
                    ToastService.pomodoroFinished();
                } else {
                    $scope.progress++;
                    bigTime--;
                }
            }

            $scope.startTimer = function() {
                $scope.running = true;
                countdownID = $interval(counter, 1000);
            }

            $scope.resetTimer = function() {

                bigTime = 1499;
                $scope.progress = 0;

                $scope.finished = false;
                $scope.running = false;

                $scope.minsText = "25";
                $scope.secsText = "00";

                $interval.cancel(countdownID);
            }






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