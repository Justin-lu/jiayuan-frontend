'use strict';
// Controllers

var webApp = angular.module('webAppControllers', []);

// create the controller and inject Angular's $scope

//mainController
webApp.controller('homeController', function($scope) {
  $(".home").addClass('active').siblings().removeClass('active');
  $(".loading-mask").hide();
  $('.navbar').show();
});

//showController
webApp.controller('showController', ['$scope', '$routeParams', '$http', '$sce', function($scope, $routeParams, $http, $sce) {
  $(".loading-mask").show();
  $('.navbar').hide();

  var url = Helper.apiUrl("/goods/" + $routeParams.id)
  $http.get(url).success(function(data) {
    $scope.goodData = data.data;
    $scope.maxImage = Helper.urlWithRoot(data.data.maximage);
    $scope.detail = $sce.trustAsHtml(data.data.detail);
    $scope.images = data.data.images.split(',').map(function(image){ return Helper.urlWithRoot(image)});

    $scope.addToCart = function(){
      var url = Helper.apiUrl("/cart/" + Helper.getUId());
      var carts = [{'goodid': $scope.goodData.goodid, 'number': 1}];
      var data = JSON.stringify({'carts': carts})
      $http.post(url, data);
    }
    $(".loading-mask").hide();
  })
}]);

// category
webApp.controller('categoryController', ['$scope', '$http', function($scope, $http) {
  $(".category").addClass('active').siblings().removeClass('active');
  var height = $(window).height() - 52 - 45 + 'px';
  $('#left_sroll, #right_sroll').css('height', height);

  // http://115.28.145.57:3388/api/v1.0//categorys/000
  var url = Helper.apiUrl("/categorys/000")
  $http({
    method: 'GET',
    url: url
  }).success(function(data, status, headers, config) {
    $scope.rootCategories = data.data
  }).error(function(data, status, headers, config) {});

  $scope.$on('ngRepeatFinished', function(){
    $scope.leftSroll = new IScroll('#left_sroll', {
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
  })

  $scope.showChildCategory = function(event){
    $(event.target).addClass('cur').siblings().removeClass('cur');
    $scope.leftSroll.scrollToElement(event.target);
    // $scope.rootCategories.pop()
    // $scope.$apply()
  }

  $('.navbar').show();
  $(".loading-mask").hide();
}]);

// cart
webApp.controller('cartController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  var url = Helper.apiUrl("/cart/" + $routeParams.uid)
  $http.get(url).success(function(data) {
    var vm = $scope.vm = {};
    vm.cartItems = data.data.map(function(item){
      item.url = Helper.urlWithRoot(item.maximage);
      return item;
    });
    vm.totalPrice = function(){
      var amount = 0;
      vm.cartItems.forEach(function(item){
        amount += item.quantity * item.nowprice
      });
      return amount
    }

    // should syn to remote data;
    vm.add = function(index){
      vm.cartItems[index].quantity += 1;
    };
    vm.decrease = function(index){
      if (vm.cartItems[index].quantity > 1){
        vm.cartItems[index].quantity -= 1;
      }
    };
    $(".loading-mask").hide();
  })

  $(".cart").addClass('active').siblings().removeClass('active');
  $('.navbar').show();
}]);

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
  // http://115.28.145.57:3388/api/v1.0/ads
  var url = Helper.apiUrl("/ads")
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
