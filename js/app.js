'use strict';

/* App Module */

var travBudApp = angular.module('travBudApp', [
  'ngRoute',

  'travBudDirectives',
  'travBudControllers'
]);

travBudApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: ''
      }).
      when('/personal_info', {
        templateUrl: 'partials/personalInfo.html',
        controller: ''
      }).
      when('/trip_details', {
        templateUrl: 'partials/tripDetails.html',
        controller: ''
      }).
      when('/preference', {
        templateUrl: 'partials/preference.html',
        controller: 'PreferenceCtrl'
      }).
      when('/browse_traveler', {
        templateUrl: 'partials/browseTraveler.html',
        controller: ''
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
