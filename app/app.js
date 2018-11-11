var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/product', {
      title: 'Product',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    }).
    when('/category', {
      title: 'Category',
      templateUrl: 'partials/categories.html',
      controller: 'categoriesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    
	
	
	
	