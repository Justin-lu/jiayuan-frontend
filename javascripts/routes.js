// create the module and name it webApp
var webApp = angular.module('webApp', [
  'ngRoute',
  'ngAnimate',

  'webAppControllers'

]);


webApp.directive("menu", function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/menu.html',
        replace: true
    }
});

// Initialize the main module
webApp.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

    'use strict';

    /**
     * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
     * @param  {String} path               The root-relative url for the new route
     * @param  {String} pageAnimationClass A classname defining the desired page transition
     */
    $rootScope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
            $rootScope.pageAnimationClass = 'crossFade';
        }

        else { // Use the specified animation
            $rootScope.pageAnimationClass = pageAnimationClass;
        }

        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }

        else { // Go to the specified path
            $location.path(path);
        }
    };
}]);

// configure our routes
webApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  // route for the home page
  .when('/', {
    templateUrl : 'templates/home.html',
    controller  : 'homeController'
  })

  // route for the class page
  .when('/show/:id', {
    templateUrl : 'templates/show.html',
    controller  : 'showController'
  })

  .when('/category', {
    templateUrl : 'templates/category.html',
    controller  : 'categoryController'
  })

  .when('/cart/:uid', {
    templateUrl : 'templates/cart.html',
    controller  : 'cartController'
  })

  .when('/user', {
    templateUrl : 'templates/user.html',
    controller  : 'userController'
  })

  .when('/search/:keyword', {
    templateUrl : 'templates/search_detail.html',
    controller  : 'serarchController'
  })

  .when('/clearing/:ids', {
    templateUrl : 'templates/clearing.html',
    controller  : 'clearingController'
  })

  .when('/info/:uid', {
    templateUrl : 'templates/info.html',
    controller  : 'infoController'
  });

}]);

