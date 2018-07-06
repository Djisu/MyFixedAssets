angular.module("locationsAdmin",[])
.constant("locationsUrl", "http://localhost:5500/locations/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("adminlocationsCtrl", function ($scope, $resource, $http, locationsUrl) {

    $scope.locationsResource = $resource(locationsUrl + ":id", { id: "@id" });

    $scope.listlocations = function () {
        $scope.locations = $scope.locationsResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			alert("Error") //document.getElementById('output').innerHTML = 'ERROR';
		};
		xhr.open(method, url, true);
		return xhr;
	};

	 $scope.deletelocations = function(locations) {
		var url = 'http://localhost:5500/locations/' + locations.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.locationsResource.query();
		$scope.listlocationsResource();
	};

	 

    $scope.createlocationsResource = function (locationsResource) {
        new $scope.locationsResource(locations).$save().then(function (newlocations) {
            $scope.locations.push(newlocations);
            $scope.editedlocations = null;
        });
    }

    $scope.updatelocations = function (locations) {
        locations.$save();
        $scope.editedlocations = null;
    }

    $scope.startEdit = function (locations) {
        $scope.editedlocations = locations;
    }

    $scope.cancelEdit = function () {
        $scope.editedlocations = null;
    }

    $scope.listlocations();
});
