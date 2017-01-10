'use strict';

angular.module('clock', [])
.run(function($rootScope) {
  $rootScope.example = 'just a test';
})
.controller('clockController', function($scope, $interval) {
  var timeNow = function() {
    var time =  new Date();
    return time.toString().slice(15, 24);
  }

  $interval(function(){
    $scope.time = timeNow();
  }, 1000, 0);
  $scope.time = timeNow();
})
.controller('clockController2', function($scope, $interval) {
  var dateNow = function() {
    var date =  new Date();
    return date.toString().slice(4, 10);
  }

  $interval(function(){
    $scope.date = dateNow();
  }, 1000, 0);
  $scope.date = dateNow();
})
.directive('helloWorld', function() {
  return {
    scope: {
      example: '@'
    },
    restrict: 'AE',
    replace: true,
    template: '<p>{{example}}</p>',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.example = "white";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});
