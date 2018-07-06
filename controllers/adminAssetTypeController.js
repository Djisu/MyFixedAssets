angular.module("assetsTypeAdmin",[])
.constant("assetTypeUrl", "http://localhost:5500/assettype/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("adminassetTypeCtrl", function ($scope, $resource, $http, assetTypeUrl) {

    $scope.assetTypeResource = $resource(assetTypeUrl + ":id", { id: "@id" });

    $scope.listassetType = function () {
        $scope.assetType = $scope.assetTypeResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			alert("Error") //document.getElementById('output').innerHTML = 'ERROR';
		};
		xhr.open(method, url, true);
		return xhr;
	};

	 $scope.deleteassetType = function(assetType) {
		var url = 'http://localhost:5500/assettype/' + assetType.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.assetTypeResource.query();
		$scope.listassetTypeResource();
	};

	 

    $scope.createassetType = function (assetType) {
        new $scope.assetTypeResource(assetType).$save().then(function (newassetType) {
            $scope.assetType.push(newassetType);
            $scope.editedassetType = null;
        });
    }

    $scope.updateassetType = function (assetType) {
        assetType.$save();
        $scope.editedassetType = null;
    }

    $scope.startEdit = function (assetType) {
        $scope.editedassetType = assetType;
    }

    $scope.cancelEdit = function () {
        $scope.editedassetType = null;
    }

    $scope.listassetType();
});
