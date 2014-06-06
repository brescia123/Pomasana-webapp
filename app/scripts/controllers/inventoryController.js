'use strict';

angular.module('pomasanaAppApp')
    .controller('InventoryCtrl', function($scope, AuthService, TaskService, ErrorService, ToastService, PomotasksService, ModalService) {


        //Init

        $scope.projects = {};
        $scope.tasks = {};
        $scope.selectedProject = {};


        //Functions

        $scope.loadProjects = function() {
            TaskService.query(function(response) {
                $scope.projects = response.data.data;
                $scope.selectedProject = $scope.projects[0];

                $scope.loadTasks();
            }, function(error) {
                ErrorService.handle(error);
            });
        }

        $scope.loadTasks = function() {
            $scope.task = {};
            TaskService.getTasks({
                    id: $scope.selectedProject.id
                },
                function(response) {
                    $scope.tasks = response.data;
                }, function(error) {
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


    });