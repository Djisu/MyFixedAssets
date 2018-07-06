angular.module("departmentAdmin",[])
.constant("departmentUrl", "http://localhost:5500/department/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("admindepartmentCtrl", function ($scope, $resource, $http, departmentUrl) {

    $scope.departmentResource = $resource(departmentUrl + ":id", { id: "@id" });

    $scope.listdepartment = function () {
        $scope.department = $scope.departmentResource.query();
    }

	
	var createXhr = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			alert("Error") //document.getElementById('output').innerHTML = 'ERROR';
		};
		xhr.open(method, url, true);
		return xhr;
	};

	 $scope.deletedepartment = function(department) {
		var url = 'http://localhost:5500/department/' + department.id;
		var xhr = createXhr('DELETE', url);
		xhr.withCredentials = true;		
		xhr.send();
		//$scope.products = $scope.departmentResource.query();
		$scope.listdepartmentResource();
	};

	 

    $scope.createdepartment = function (departmentResource) {
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
});
