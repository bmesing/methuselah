'use strict';

/**
 * @ngdoc function
 * @name produktinformationApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the produktinformationApp
 */
angular.module('produktinformationApp')
  .controller('ProductCtrl', function ($scope, $routeParams) {
    $scope.productId = $routeParams.productId;
    $scope.data.product = $scope.data.products[$scope.productId]
  });
