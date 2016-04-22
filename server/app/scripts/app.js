'use strict';

/**
 * @ngdoc overview
 * @name produktinformationApp
 * @description
 * # produktinformationApp
 *
 * Main module of the application.
 */
angular
  .module('produktinformationApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ui.bootstrap',

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/products', {
        templateUrl: 'views/productlist.html',
        controller: 'ProductlistCtrl',
        controllerAs: 'productList'
      })
      .when('/products/:productId', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/uploadReport', {
        templateUrl: 'views/uploadreport.html',
        controller: 'UploadreportCtrl',
        controllerAs: 'uploadReport'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
