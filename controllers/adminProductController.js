angular.module("sportsStoreAdmin")
.constant("productUrl", "http://localhost:5500/fixedassets/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("productCtrl", function ($scope, $resource, $http, productUrl) {

    $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			alert("Error") //document.getElementById('output').innerHTML = 'ERROR';
		};
		xhr.open(method, url, true);
		return xhr;
	};

	 $scope.deleteProduct = function(product) {
		var url = 'http://localhost:5500/fixedassets/' + product.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.productsResource.query();
		$scope.listProducts();
	};

	 

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }

    $scope.updateProduct = function (product) {
        product.$save();
        $scope.editedProduct = null;
    }

    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }

    $scope.listProducts();
});
