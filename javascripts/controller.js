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
  // $('.arrow-left').on('click', function(e){
  //   e.preventDefault()
  //   mySwiper.swipePrev()
  // })
  // $('.arrow-right').on('click', function(e){
  //   e.preventDefault()
  //   mySwiper.swipeNext()
  // })
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

  var leftSroll = new IScroll('#left_sroll', { bounceEasing: 'elastic', bounceTime: 1200 });
  var rightSroll = new IScroll('#right_sroll', { bounceEasing: 'elastic', bounceTime: 1200 });
});

// cart
webAppControllers.controller('cartController', function($scope){

});

// user
webAppControllers.controller('userController',function($scope){

});
