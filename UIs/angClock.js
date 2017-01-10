'use strict';

angular.module('clock', []).
controller('clockController', function($scope, $interval) {
  var timeNow = function() {
    var time =  new Date();
    return time.toString().slice(15, 24);
  }

  $interval(function(){
    $scope.time = timeNow();
  }, 1000, 0);
  $scope.time = timeNow();
})
