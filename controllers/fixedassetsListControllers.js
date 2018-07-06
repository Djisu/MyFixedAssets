angular.module("sportsStore")
.constant("fixedassetsListActiveClass", "btn-primary")
.constant("fixedassetsListPageCount", 3)
.controller("productListCtrl", function ($scope, $filter,fixedassetsListActiveClass, fixedassetsListPageCount) {
	var selectedLocation = null;
	$scope.selectedPage = 1;
	$scope.pageSize = fixedassetsListPageCount;
		
	$scope.selectLocation = function (newLocation) {
		selectedLocation = newLocation;
		$scope.selectedPage = 1;
	}
	$scope.selectPage = function (newPage) {
			$scope.selectedPage = newPage;
	}
	$scope.LocationFilterFn = function (fixedassets) {
		return selectedLocation == null || fixedassets.Location == selectedLocation;
	}
	$scope.getLocationClass = function (Location) {
		return selectedLocation == Location ? fixedassetsListActiveClass : "";
	}
	$scope.getPageClass = function (page) {
		return $scope.selectedPage == page ? fixedassetsListActiveClass : "";
	}
	
	$scope.ProduceDepreRegister = function (fixedassets) {
		return selectedLocation == null || fixedassets.Location == selectedLocation;
	}
	$scope.ProduceAccumDepreRegister = function (fixedassets) {
		return selectedLocation == null || fixedassets.Location == selectedLocation;
	}
	$scope.ProduceDisposedAssetsRegister = function (fixedassets) {
		return selectedLocation == null || fixedassets.Location == selectedLocation;
	}
	$scope.ProduceAssetsRegister = function (fixedassets) {
		return selectedLocation == null || fixedassets.Location == selectedLocation;
	}
});