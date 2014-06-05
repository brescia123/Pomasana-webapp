'use strict';

angular.module('pomasanaAppApp')
    .controller('NavbarcontrollerCtrl', function($scope, $location) {

    $scope.isActive = function(tab) {
        return tab === $location.path();
    }

    });