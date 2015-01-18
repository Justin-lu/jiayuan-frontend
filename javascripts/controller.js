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
  $(".loading-mask").hide();

});

//showController
webApp.controller('showController', ['$scope', '$routeParams', '$http', '$sce', function($scope, $routeParams, $http, $sce) {
  $(".loading-mask").show();
  $(".nav-header").text("团购详情");
  $('.navbar').hide();

  var url = Helper.apiUrl("/goods/" + $routeParams.id)
  $http.get(url).success(function(data) {
    $scope.goodData = data.data;
    $scope.maxImage = Helper.urlWithRoot(data.data.maximage);
    $scope.detail = $sce.trustAsHtml(data.data.detail);
    $scope.images = data.data.images.split(',').map(function(image){ return Helper.urlWithRoot(image)});
    $(".loading-mask").hide();
  })
}]);

// category
webApp.controller('categoryController', function($scope) {
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
  $(".loading-mask").hide();
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
  $(".loading-mask").hide();
});

webApp.controller('serarchController', function($scope) {
  $('.navbar').show();
  $(".loading-mask").hide();
});

webApp.controller('clearingController', function($scope) {
  console.log(window.foo = 'something')
  $('.navbar').hide();
  $(".loading-mask").hide();
});

webApp.controller('infoController', function($scope){
  console.log(window.foo='infoPage')
  $('.navbar').hide();
  $(".loading-mask").hide();
})

webApp.controller('homeSlideCtrl', ['$scope', '$http', function($scope, $http) {
  // http://115.28.145.57:3388/api/v1.0/ad
  var url = Helper.apiUrl("/ad")
  $http({
    method: 'GET',
    url: url
  }).success(function(data, status, headers, config) {
    $scope.slides = data.data.map(function(item){
      item.url = Helper.urlWithRoot(item.maximage);
      item.link = Helper.getUrlWithId(item.goodid);
      return item;
    })
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
    $(".loading-mask").hide();
  }).error(function(data, status, headers, config) {});
}]);
