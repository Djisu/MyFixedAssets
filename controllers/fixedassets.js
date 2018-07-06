angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/fixedassets")
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {

        $scope.data = {};

        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.fixedassets = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });
    });
