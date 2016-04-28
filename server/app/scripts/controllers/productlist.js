'use strict';

/**
 * @ngdoc function
 * @name produktinformationApp.controller:ProductlistCtrl
 * @description
 * # ProductlistCtrl
 * Controller of the produktinformationApp
 */
angular.module('produktinformationApp')
  .controller('ProductlistCtrl', function ($scope, $http) {

    $scope.data = {
        products : {},
        deleteModeActive : false

    }


    $scope.deleteItem = function(itemId, rev) {
        var item = $scope.data.products[itemId];
        $http.delete("http://127.0.0.1:5984/productinformation/" + itemId + "?rev=" + rev)
        .then(function success(response) {
            toastr.success("<em>" + item.name + "</em> gelöscht");
            delete $scope.data.products[itemId];
            console.log("Delted item " + itemId);

        }, function error(response) {
            console.log("Error deleting " + itemId);
            toastr.error("Fehler beim Löschen von <em>" + item.name + "</em>");
        });

    }


    $scope.toggleDeleteMode = function() {
        $scope.data.deleteModeActive = !$scope.data.deleteModeActive;
    }

    $scope.init = function() {

        $http.get('http://127.0.0.1:5984/productinformation/_design/products/_view/products')
            .then(function success(response) {
            console.log(response.data.rows);

            for (var i = 0; i < response.data.rows.length; i++) {
                var product = response.data.rows[i];
                console.log(product);
                $scope.data.products[product.id] = product.value;
            }
        }, function error(response) {

        }
      );
    }

    $scope.init();


});
