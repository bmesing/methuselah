angular.module('produktinformationApp')
  .controller('GlobalCtrl', function ($scope, $http) {
    $scope.text = "text";
    $scope.data = {
      products : {}
    }

    $scope.init = function() {

        $http.get('http://127.0.0.1:5984/productinformation/_all_docs?include_docs=true')
            .then(function success(response) {
            console.log(response.data.rows);

            for (var i = 0; i < response.data.rows.length; i++) {
                var product = response.data.rows[i].doc;
                console.log(product);
                if (product.ean) {
                    $scope.data.products[product.ean] = product;
                }
            }
        }, function error(response) {

        }
      );
    }

    $scope.init();

  });
