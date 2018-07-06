angular.module("sportsStore")
.constant("dataUrl", "http://localhost:5500/fixedassets")
.controller("sportsStoreCtrl", function ($scope) {

    $scope.data = {$http.get(dataUrl)
	.success(function (data) {
		$scope.data.fixedassets = data;
	})
	.error(function (error) {
		$scope.data.error = error;
	});
		
		
        /* fixedassets: [
            { assetDesc: "Toshiba 2312", assetType: "Electronic Device",depreType: "Straight Line", depreRate: 20, residAmount: 12, usefulYears:3, assetCost:1500, purchaseDate:"1/1/2012",serialNo:"54786", company:"Ghana Commercial Bank", location:"Accra", department:"Accounts",picturePlace:"" },
			{ assetDesc: "Toshiba 2355", assetType: "Electronic Device",depreType: "Straight Line", depreRate: 20, residAmount: 12, usefulYears:3, assetCost:1500, purchaseDate:"1/1/2012",serialNo:"90876", company:"Ghana Commercial Bank", location:"Kumasi", department:"Accounts",picturePlace:"" },
			{ assetDesc: "Toyota Camry", assetType: "Saloon Car",depreType: "Straight Line", depreRate: 20, residAmount: 1299, usefulYears:13, assetCost:15000, purchaseDate:"1/1/2012",serialNo:"GT6798-12", company:"Ghana Commercial Bank", location:"tAKORADI", department:"Human Resource",picturePlace:"" },
			{ assetDesc: "Kingdom furniture", assetType: "Furniture",depreType: "Straight Line", depreRate: 20, residAmount: 12, usefulYears:3, assetCost:557, purchaseDate:"1/1/2012",serialNo:"90876", company:"Ghana Commercial Bank", location:"Accra", department:"Accounts",picturePlace:"" },
			{ assetDesc: "Compaq Laptop", assetType: "Electronic Device",depreType: "Straight Line", depreRate: 20, residAmount: 12, usefulYears:3, assetCost:1500, purchaseDate:"1/1/2012",serialNo:"54786", company:"Ghana Commercial Bank", location:"Lagos", department:"Accounts",picturePlace:"" }]
    }; */
});
