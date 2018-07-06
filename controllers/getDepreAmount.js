var app = angular.module('sportsStore')
.constant("depreUrl", "http://localhost:5500/depreamount")
.controller('getDepreAmount', ['$scope', '$http', function($scope, $http){
    $http.get(depreUrl).then(function(data){
         $scope.data = data;

         /* angular.forEach($scope.data, function(value, key){
         if(value.Password == "thomasTheKing")
           console.log("username is thomas");
         }); */
    });

});



