'use strict';

/**
 * @ngdoc directive
 * @name produktinformationApp.directive:productListItem
 * @description
 * # productListItem
 */
angular.module('produktinformationApp')
  .directive('productListItem', function () {
    return {
      template: '<li>Item: <a ng-href="/#{{product.href}}">{{product.name}}</a>; {{product.value.ean}}</li>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the productListItem directive');
      }
    };
  });
