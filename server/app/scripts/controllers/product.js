'use strict';

/**
 * @ngdoc function
 * @name produktinformationApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the produktinformationApp
 */
angular.module('produktinformationApp')
  .controller('ProductCtrl', function ($scope, $routeParams, $http) {
    $scope.data = {
        productId : $routeParams.productId,
        product : {}
    }

    $scope.init = function() {
        $http.get('http://127.0.0.1:5984/productinformation/' + $scope.data.productId)
            .then(function success(response) {
                    console.log(response.data);
                    $scope.data.product = response.data;
                }
            );

    }

    $scope.init();


});
