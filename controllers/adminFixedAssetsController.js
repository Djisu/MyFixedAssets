angular.module("sportsStoreAdmin")
.constant("fixedassetsUrl", "http://localhost:5500/fixedassets/")
.constant("departmentUrl", "http://localhost:5500/department/")
.constant("locationUrl", "http://localhost:5500/location/")
.constant("assettypeUrl", "http://localhost:5500/assettype/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("fixedAssetsCtrl", function ($scope, $resource, $http, fixedassetsUrl) {            
    $scope.fixedassetsResource = $resource(fixedassetsUrl + ":id", { id: "@id" });

    $scope.listfixedassets = function () {
        $scope.fixedassets = $scope.fixedassetsResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			
		};
		xhr.open(method, url, true);
		return xhr;
	};
               
	 $scope.deleteFixedassets = function(fixedassets) {
		var url = 'http://localhost:5500/fixedassets/' + fixedassets.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.productsResource.query();
		$scope.listfixedassets();
	};

	 

    $scope.createFixedassets = function (fixedassets) {
		if ($scope.fixedassets)
        new $scope.fixedassetsResource(fixedassets).$save().then(function (newFixedassets) {
            $scope.fixedassets.push(newFixedassets);
            $scope.editedFixedassets = null;
        });
    }

    $scope.updateFixedassets = function (fixedassets) {
        fixedassets.$save();
        $scope.editedFixedassets = null;
    }

    $scope.startEdit = function (fixedassets) {
        $scope.editedFixedassets = fixedassets;
    }

    $scope.cancelEdit = function () {
        $scope.editedFixedassets = null;
    }

    $scope.listfixedassets();
	
	/* $scope.computeNeeded = function() {
		$scope.needed = $scope.startingEstimate * 10;
	}; */
	$scope.getSerialNo = function (fixedassets) {
		var counter=0;
		window.alert("I am here")
		for (var i = 0; i < $scope.fixedassets.length; i++) {
			if ($scope.fixedassets[i].assetType == fixedassets.assetType) {
				counter++;
			}
		}
		$scope.fixedassets.serialNo =  counter++;
	} 
})	
.controller("departmentCtrl", function ($scope, $resource, $http, departmentUrl) {            
    $scope.departmentResource = $resource(departmentUrl + ":id", { id: "@id" });

    $scope.listdepartment = function () {
        $scope.department = $scope.departmentResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			
		};
		xhr.open(method, url, true);
		return xhr;
	};
               
	 $scope.deletedepartment = function(department) {
		var url = 'http://localhost:5500/department/' + department.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.productsResource.query();
		$scope.listdepartment();
	};

	 

    $scope.createdepartment = function (department) {
        new $scope.departmentResource(department).$save().then(function (newdepartment) {
            $scope.department.push(newdepartment);
            $scope.editeddepartment = null;
        });
    }

    $scope.updatedepartment = function (department) {
        department.$save();
        $scope.editeddepartment = null;
    }

    $scope.startEdit = function (department) {
        $scope.editeddepartment = department;
    }

    $scope.cancelEdit = function () {
        $scope.editeddepartment = null;
    }

    $scope.listdepartment();
})
.controller("locationCtrl", function ($scope, $resource, $http, locationUrl) {            
    $scope.locationResource = $resource(locationUrl + ":id", { id: "@id" });

    $scope.listlocation = function () {
        $scope.location = $scope.locationResource.query();
    }

	$scope.getLocation = function () {
        return 'http://localhost:5500/location/';
    }
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			
		};
		xhr.open(method, url, true);
		return xhr;
	};
               
	 $scope.deletelocation = function(location) {
		var url = 'http://localhost:5500/location/' + location.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.productsResource.query();
		$scope.listlocation();
	};

	 

    $scope.createlocation = function (location) {
        new $scope.locationResource(location).$save().then(function (newlocation) {
            $scope.location.push(newlocation);
            $scope.editedlocation = null;
        });
    }

    $scope.updatelocation = function (location) {
        location.$save();
        $scope.editedlocation = null;
    }

    $scope.startEdit = function (location) {
        $scope.editedlocation = location;
    }

    $scope.cancelEdit = function () {
        $scope.editedlocation = null;
    }

    $scope.listlocation();
})
.controller("assettypeCtrl", function ($scope, $resource, $http, assettypeUrl) {            
    $scope.assettypeResource = $resource(assettypeUrl + ":id", { id: "@id" });

    $scope.listassettype= function () {
        $scope.assettype = $scope.assettypeResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			
		};
		xhr.open(method, url, true);
		return xhr;
	};
               
	 $scope.deleteassettype = function(assettype) {
		var url = 'http://localhost:5500/assettype/' + assettype.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.productsResource.query();
		$scope.listassettype();
	};

	 

    $scope.createassettype = function (assettype) {
        new $scope.assettypeResource(assettype).$save().then(function (newassettype) {
            $scope.assettype.push(newassettype);
            $scope.editedassettype = null;
        });
    }

    $scope.updateassettype = function (assettype) {
        assettype.$save();
        $scope.editedassettype = null;
    }

    $scope.startEdit = function (assettype) {
        $scope.editedassettype = assettype;
    }

    $scope.cancelEdit = function () {
        $scope.editedassettype = null;
    }

    $scope.listassettype();
	
	
	
	
	/* $scope.data = {};
	$scope.data = $http.get(assettypeUrl)
	.success(function (data) {
		$scope.data.assettype = data;
	})
	.error(function (error) {
		$scope.data.error = error;
	}); */
});



