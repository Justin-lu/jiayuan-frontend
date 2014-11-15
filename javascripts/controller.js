'use strict';
// Controllers

var webAppControllers = angular.module('webAppControllers',[]);

// create the controller and inject Angular's $scope

//mainController
webAppControllers.controller('homeController', function($scope) {
  // create a message to display in our view
  $scope.message = 'home page!';
});

//showController
webAppControllers.controller('showController', function($scope) {
  $scope.message = 'show page';
});
