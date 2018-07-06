angular.module("sportsStore")
.constant("dataUrl", "http://localhost:5500/fixedassets")
.constant("depreUrl", "http://localhost:5500/depreAmount")
.controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {
	
		$http.get(dataUrl).success(function (data) {
			$scope.data.fixedassets = data;
			
			//Open the fixed assets table
			if ($scope.data.fixedassets.length>0){
				for (var i = 0; i < $scope.fixedassets.length; i++) {
					
					//Open the depreAmount table
					$http.get(depreUrl).success(function (data) {
						$scope.data.depreAmount = data;
						
						if ($scope.data.fixedassets[i].assetDesc == $scope.data.depreAmount.assetDesc) {
							
							if ($scope.data.depreAmount.depreYear=year(new Date().getDay()) && 
							    $scope.data.depreAmount.depreAmount>0{
								
								
							}
							$scope.products[i] = product;
							break;
						}
						
					});
					
					
				}
			}
		});
			
		
	})
	.error(function (error) {
		$scope.data.error = error;
	});
});







angular.module("sportsStoreAdmin")
.controller("checkDepreCtrl", function ($scope) {
	$scope.displayMode = "list";
	$scope.currentProduct = null;
	$scope.listProducts = function () {
	$scope.products = [
	{ id: 0, name: "Dummy1", category: "Test", price: 1.25 },
	{ id: 1, name: "Dummy2", category: "Test", price: 2.45 },
	{ id: 2, name: "Dummy3", category: "Test", price: 4.25 }];
	}
	$scope.deleteProduct = function (product) {
	$scope.products.splice($scope.products.indexOf(product), 1);
	}
	$scope.createProduct = function (product) {
	$scope.products.push(product);
	$scope.displayMode = "list";
	}
	$scope.updateProduct = function (product) {
	for (var i = 0; i < $scope.products.length; i++) {
	if ($scope.products[i].id == product.id) {
	$scope.products[i] = product;
	break;
	}
	}
	$scope.displayMode = "list";
	}
	$scope.editOrCreateProduct = function (product) {
	$scope.currentProduct =
	product ? angular.copy(product) : {};
	$scope.displayMode = "edit";
	}
	$scope.saveEdit = function (product) {
	if (angular.isDefined(product.id)) {
	$scope.updateProduct(product);
	} else {
	$scope.createProduct(product);
	}
	}
	$scope.cancelEdit = function () {
	$scope.currentProduct = {};
	$scope.displayMode = "list";
	}
	$scope.listProducts();
});
