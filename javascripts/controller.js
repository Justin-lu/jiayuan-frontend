'use strict';
// Controllers

var webAppControllers = angular.module('webAppControllers',[]);

// create the controller and inject Angular's $scope

//mainController
webAppControllers.controller('homeController', function($scope) {
  // create a message to display in our view
  $scope.message = 'home page!';
  $(".nav-header").text("首页");

  $(".home").addClass('active').siblings().removeClass('active');

  // init slider picture
  var mySwiper = $('.swiper-container').swiper({
      //Your options here:
      mode:'horizontal',
      calculateHeight: true,
      speed:750,
      autoplay: 3000,
      pagination: '.pagination',
      paginationClickable: true,
      loop: true
      //etc..
  });
});

//showController
webAppControllers.controller('showController', function($scope) {
  $scope.message = 'show page';
  $(".nav-header").text("团购详情");

});

// category
webAppControllers.controller('categoryController', function($scope){
  $scope.message = 'show page';
  $(".nav-header").text("分类列表");
  $(".category").addClass('active').siblings().removeClass('active');
  var height = $(window).height() - 52 - 45 + 'px';
  $('#left_sroll, #right_sroll').css('height', height);

  var leftSroll = new IScroll('#left_sroll', { tap:true, mouseWheel: true, click: true });
  var rightSroll = new IScroll('#right_sroll', { mouseWheel: true, click: true });

  $('#left_sroll ul li').on('tap', function(){
    $(this).addClass('cur').siblings().removeClass('cur');
    leftSroll.scrollToElement(this);
    // filter right_scroll;
  });
});

// cart
webAppControllers.controller('cartController', function($scope) {
  $(".cart").addClass('active').siblings().removeClass('active');
});

// user
webAppControllers.controller('userController', function($scope) {
  $(".user").addClass('active').siblings().removeClass('active');
});

webAppControllers.controller('serarchController', function($scope){

});
