'use strict';

angular.module('pomasanaAppApp')
    .controller('InventoryCtrl', ['$scope', 'AuthService', 'TaskService', 'ErrorService', 'ToastService', 'PomotasksService', 'ModalService',
        function($scope, AuthService, TaskService, ErrorService, ToastService, PomotasksService, ModalService) {


            //Init

            $scope.projects = {};
            $scope.tasks = {};
            $scope.selectedProject = {};
            $scope.loading = false;



            //Functions

            $scope.loadProjects = function() {
                $scope.loading = true;

                TaskService.query(function(response) {
                    $scope.projects = response.data.data;
                    $scope.selectedProject = $scope.projects[0];
                    $scope.loadTasks();
                }, function(error) {
                    $scope.loading = false;
                    ErrorService.handle(error);
                });
            }

            $scope.loadTasks = function() {
                $scope.loading = true;

                $scope.task = {};
                TaskService.getTasks({
                        id: $scope.selectedProject.id
                    },
                    function(response) {
                        $scope.loading = false;
                        $scope.tasks = response.data;
                    }, function(error) {
                        $scope.loading = false;
                        ErrorService.handle(error);
                    });
            }

            $scope.load = function() {
                $scope.loadProjects();
            }


            $scope.deletePomotaskModal = function(task) {
                ModalService.pomoTaskDelete(task).then(function(argument) {
                    $scope.loadTasks();
                })
            }
            $scope.createPomotaskModal = function(task) {
                ModalService.pomoTaskCreate(task).then(function() {
                    $scope.loadTasks();
                });
            }



            //Start

            $scope.load();


        }
    ]);