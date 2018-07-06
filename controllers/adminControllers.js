angular.module("sportsStoreAdmin")
.constant("authUrl","http://localhost:5500/dashboard/users/data/login/" ) 
.controller("authCtrl", function($scope, $http, $location, authUrl) {
    $scope.authenticate = function (user, pass) {
        $http.post(authUrl, {
            username: user,
            password: pass
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/main");
        }).error(function (error) {
            $scope.authenticationError = error;
        });
    }
})
.controller("mainCtrl", function($scope) {
    $scope.screens = ["Fixed_Assets","department","location","assettype"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function () {
		if ($scope.current == "Fixed_Assets"){
		   	return "/views/AdminFixedAssets1.html";
		}		
		if ($scope.current == "department"){
		   	return "/views/AdminDepartment.html";
		}  
		if ($scope.current == "location"){
		   	return "/views/Adminlocation.html";
		} 
		if ($scope.current == "assettype"){
		   	return "/views/AdminAssetType.html";
		} 
    };
});
/* .controller("ordersCtrl", function ($scope, $http, ordersUrl) {
	$http.get(ordersUrl, {withCredentials : true})
	.success(function (data) {
		$scope.orders = data;
	})
	.error(function (error) {
		$scope.error = error;
	});
	$scope.selectedOrder;
	$scope.selectOrder = function(order) {
		$scope.selectedOrder = order;
	};
	$scope.calcTotal = function(order) {
		var total = 0;
		for (var i = 0; i < order.products.length; i++) {
		total +=
		order.products[i].count * order.products[i].price;
		}
		return total;
	}
}); */
