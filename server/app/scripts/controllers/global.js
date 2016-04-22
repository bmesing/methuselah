angular.module('produktinformationApp')
  .controller('GlobalCtrl', function ($scope, $http) {
    $scope.text = "text";
    $scope.data = {
      products : {}
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

