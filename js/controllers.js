'use strict';

/* Controllers */

var travBudControllers = angular.module('travBudControllers', [
  'localytics.directives',
  'itemSwipe',
  'ngAnimate'
]);

travBudControllers.controller('LoginCtrl', ['$scope', function($scope) {

}]);

travBudControllers.controller('PreferenceCtrl', ['$scope', function($scope) {
  $scope.name = 'Choose Multiple Preferences';
  $scope.state = ['California', 'Arizona'];
  $scope.states = [
    'Alaska',
    'Arizona',
    'Arkansas',
    'California'
  ];

  $scope.createOption = function(term) {
    $scope.$apply(function() {
      $scope.states.push(term);
      $scope.state.push(term);
    });
  }
}]);

travBudControllers.controller('BrowseTravelerCtrl', function ($scope, Things) {
  $scope.removeThing = function(thing){
    $scope.things.splice($scope.things.indexOf(thing), 1);
  };
  $scope.resetThings = function(){
    $scope.things = Things();
  };
  $scope.resetThings();
});
travBudControllers.value('Things', function () {
  return [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}];
});
