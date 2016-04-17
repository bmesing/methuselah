'use strict';

/**
 * @ngdoc function
 * @name produktinformationApp.controller:UploadreportCtrl
 * @description
 * # UploadreportCtrl
 * Controller of the produktinformationApp
 */
angular.module('produktinformationApp')
  .controller('UploadreportCtrl', function ($scope, $http) {
    $scope.submitResult = "empty";


    $scope.submit = function(newProduct) {
      $scope.submitResult = "in progress";
      $scope.newProductX = newProduct;
      newProduct.type = 'product';
      newProduct._id = 'i' + Math.random();
      $http.post('http://127.0.0.1:5984/productinformation', newProduct).then(function success(response) {
        $scope.submitResult = 'success: ' + response.status;
      }, function error(response) {
        $scope.submitResult = 'failed: ' + response.status;
      });
    }
  });
