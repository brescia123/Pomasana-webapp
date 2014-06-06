'use strict';

angular.module('pomasanaAppApp')
    .controller('CreateModalInstanceCtrl', ['$scope', '$modalInstance', 'PomotasksService', '$window', 'task', 'ErrorService', 'ToastService',
        function($scope, $modalInstance, PomotasksService, $window, task, ErrorService, ToastService) {

            $scope.numberOptions = [1, 2, 3, 4, 5, 6, 7, 8];
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
                countdownID = $interval(counter, 5);
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
    .controller('DetailModalInstanceCtrl', ['$scope', '$modalInstance', '$window', 'pomotask', 'PomoTaskPomService',
        function($scope, $modalInstance, $window, pomotask, PomoTaskPomService) {

            $scope.pomdori = {};

            PomoTaskPomService.get({
                id: pomotask.id
            }, {}, function(response) {
                $scope.pomodori = response.data;
            }, function(error) {
                $window.alert(error.data.data);
            })

            var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");

            $scope.estimates = estArray[0];


            var estPomodori = function(pomotask) {
                var estArray = JSON.parse("[" + $scope.pomotask.estimatedPomodori + "]");
                return estArray[0][estArray[0].length - 1];
            };

            var usedPomodori = function(pomotask) {
                return $scope.pomotask.usedPomodori.length;
            };

            $scope.maxProgress = function(pomotask) {
                var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");
                var estPomodori = estArray[0][estArray[0].length - 1];
                var max = Math.max(estPomodori, pomotask.usedPomodori.length);
                return max;
            }

            $scope.ok = function() {
                $modalInstance.close();
            };

            $scope.pomotask = pomotask;

            $scope.estPomodori = estPomodori(pomotask);
            $scope.usedPomodori = usedPomodori(pomotask);


        }
    ])
    .controller('ModifyModalInstanceCtrl', ['$scope', '$modalInstance', '$window', 'pomotask', 'PomotasksService',
        function($scope, $modalInstance, $window, pomotask, PomotasksService) {

            $scope.pomotask = pomotask;

            var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");

            $scope.estimates = estArray[0];

            $scope.numberOptions = [1, 2, 3, 4, 5, 6, 7, 8];


            var estPomodori = function(pomotask) {
                var estArray = JSON.parse("[" + $scope.pomotask.estimatedPomodori + "]");
                return estArray[0][estArray[0].length - 1];
            };

            var usedPomodori = function(pomotask) {
                return $scope.pomotask.usedPomodori.length;
            };


            $scope.estPomodori = estPomodori(pomotask);
            $scope.usedPomodori = usedPomodori(pomotask);

            $scope.data = {
                estimatedPomodori: $scope.estPomodori,
                name: pomotask.name
            };


            $scope.ok = function(button) {

                button.progressStart();

                PomotasksService.updatePomoTask({
                    id: pomotask.id
                }, $scope.data, function(response) {
                    button.progressFinish();
                    $window.setTimeout(function() {
                        $modalInstance.close();
                    }, 1000);
                }, function(error) {
                    button.progressFinish();
                    $window.alert(error.data.data);
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