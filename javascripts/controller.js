'use strict';
// Controllers

var webApp = angular.module('webAppControllers', []);

// create the controller and inject Angular's $scope

//mainController
webApp.controller('homeController', function($scope) {
  // create a message to display in our view
  $scope.message = 'home page!';
  $(".nav-header").text("首页");

  $(".home").addClass('active').siblings().removeClass('active');

});

//showController
webApp.controller('showController', function($scope) {
  $scope.message = 'show page';
  $(".nav-header").text("团购详情");
  $('.navbar').hide();
});

// category
webApp.controller('categoryController', function($scope) {
  $scope.message = 'show page';
  $(".nav-header").text("分类列表");
  $(".category").addClass('active').siblings().removeClass('active');
  var height = $(window).height() - 52 - 45 + 'px';
  $('#left_sroll, #right_sroll').css('height', height);

  var leftSroll = new IScroll('#left_sroll', {
    tap: true,
    mouseWheel: true,
    click: true,
    bounceEasing: 'elastic',
    bounceTime: 1200
  });
  var rightSroll = new IScroll('#right_sroll', {
    mouseWheel: true,
    click: true
  });

  $('#left_sroll ul li').on('tap', function() {
    $(this).addClass('cur').siblings().removeClass('cur');
    leftSroll.scrollToElement(this);
    // filter right_scroll;
  });

  $('.navbar').show();
});

// cart
webApp.controller('cartController', function($scope) {
  $(".cart").addClass('active').siblings().removeClass('active');
  $('.navbar').show();
});

// user
webApp.controller('userController', function($scope) {
  $(".user").addClass('active').siblings().removeClass('active');
  $('.navbar').show();
});

webApp.controller('serarchController', function($scope) {
  $('.navbar').show();
});

webApp.controller('clearingController', function($scope) {
  console.log(window.foo = 'something')
  $('.navbar').hide();
});

webApp.controller('homeSlideCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'data/slide.json'
  }).success(function(data, status, headers, config) {
    $scope.slides = data;
    // init slider picture
    $scope.$on('ngRepeatFinished', function(){
      var mySwiper = $('.swiper-container').swiper({
        //Your options here:
        mode: 'horizontal',
        calculateHeight: true,
        speed: 750,
        autoplay: 3000,
        pagination: '.pagination',
        paginationClickable: true,
        loop: true
          //etc..
      });
    })
  }).error(function(data, status, headers, config) {});
}]);
