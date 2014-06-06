'use strict';

angular.module('pomasanaAppApp')
    .factory('HelperService', [

        function() {
            return {
                getUsedPom: function(pomotask) {
                    return pomotask.usedPomodori.length;
                },

                getEstPom: function(pomotask) {
                    var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");
                    return estArray[0][estArray[0].length - 1];
                },

                getEstimates: function(pomotask) {
                    var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");
                    return estArray[0];
                },

                getProgress: function(pomotask) {

                    var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");
                    var estPomodori = estArray[0][estArray[0].length - 1];
                    var usedPomodori = pomotask.usedPomodori.length;

                    if (usedPomodori === 0) {
                        return 0;
                    } else {
                        return (usedPomodori / estPomodori) * 100;
                    }
                },

                getMaxProgress: function(pomotask) {
                    var estArray = JSON.parse("[" + pomotask.estimatedPomodori + "]");
                    var estPomodori = estArray[0][estArray[0].length - 1];
                    var max = Math.max(estPomodori, pomotask.usedPomodori.length);
                    return max;
                },

                getLastEst: function(pomotask) {
                    return (pomotask.estimatedPomodori[1]);
                }
            };
        }
    ])