angular.module("sportsStore")
.constant("fixedassetsUrl", "http://localhost:5500/fixedassets/")
.constant("disposedassetsUrl", "http://localhost:5500/disposedassets/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("mainCtrl", function($scope) {
    $scope.screens = ["products","disposed","accumulatedDepreciation"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };
    $scope.getScreen = function () {
		if ($scope.current == "products"){
		   	return "/views/productListNew.html";
		}		
		if ($scope.current == "disposed"){
		   	return "/views/DisposedAssets.html";
		}  
		if ($scope.current == "accumulatedDepreciation"){
		   	return "/views/AccumulatedDepreciationRegister.html";
		} 
    };
})
.controller("disposeDepreCtrl", function ($scope, $filter,$http, $resource, fixedassetsUrl,disposedassetsUrl){	
		$scope.getDepreRate = function (fixedassets) {
            return (fixedassets.assetCost - fixedassets.residAmount)/fixedassets.usefulYears;
        };
		
		$scope.disposedassetsResource = $resource(disposedassetsUrl + ":assetDesc", { assetDesc: "@assetDesc" },
			{ create: { method: "POST" }, save: { method: "PUT" }});
		
		$scope.getAccumYears = function (fixedassets) {
			var varPurchaseDate=new Date(fixedassets.purchaseDate);
			var purchaseYear=varPurchaseDate.getFullYear();
			
			var todaysdate=new Date().getFullYear();
            return todaysdate - purchaseYear;			
        };
		$scope.getAccumDepre = function (fixedassets) {
			var varPurchaseDate=new Date(fixedassets.purchaseDate);
			var purchaseYear=varPurchaseDate.getFullYear();			
			var todaysdate=new Date().getFullYear();
			
			//Find the accumulated years
            var accumYears= todaysdate - purchaseYear;	
			
			//Find the depreciation rate
			var varDepreRate=(fixedassets.assetCost - fixedassets.residAmount)/fixedassets.usefulYears;
			
			//Get the accumulated depreciation
			return accumYears * varDepreRate;          
        };
		$scope.getNetBookValue = function (fixedassets) {
			var varPurchaseDate=new Date(fixedassets.purchaseDate);
			var purchaseYear=varPurchaseDate.getFullYear();			
			var todaysdate=new Date().getFullYear();
			
			//Find the accumulated years
            var accumYears= todaysdate - purchaseYear;	
			
			//Find the depreciation rate
			var varDepreRate=(fixedassets.assetCost - fixedassets.residAmount)/fixedassets.usefulYears;
			
			//Get the accumulated depreciation
			var varAccumDepre= accumYears * varDepreRate;  
            return fixedassets.assetCost - varAccumDepre;		
        };
		var createXhr = function(method, url) {
			var xhr = new XMLHttpRequest();
				xhr.onerror = function() {
				alert("Error") //document.getElementById('output').innerHTML = 'ERROR';
			};
			xhr.open(method, url, true);
			return xhr;
		};

	    $scope.deleteProduct = function(data) {
			var url = 'http://localhost:5500/disposedassets/' + data.assetDesc;
			var xhr = createXhr('DELETE', url);
			xhr.withCredentials = true;		
			xhr.send();		
		};
		
		/* $scope.createDisposedassets = function (disposedassets) {
			document.write("Just entered createproduct");
				new $scope.disposedassetsResource(disposedassets).$save().then(function (newDisposedassets) {
				$scope.disposedassets.push(disposedassets);
			document.write("Going out of createproduct");	
			})
        }; */
		$scope.createDisposedassets = function (disposedassets) {
			//document.write("Just entered createproduct");
			$http.post("http://localhost:5500/disposedassets/", disposedassets).success(function (newDisposedassets) {
				$scope.disposedassets.push(newDisposedassets);
				//$scope.displayMode = "list";
				//document.write("Going out of createproduct");
			});
		}
    
		
		$scope.getDepreReport = function (fixedassets) {
				
        };
		
		
		$scope.getDisposedAssetsReport = function () {					
				$scope.data = {};
				
				$scope.data = $http.get(fixedassetsUrl)
				.success(function (data) {
					//Delete all records from the disposed assets table
					$scope.data.disposedassets = $http.get(disposedassetsUrl)
					
					
					$scope.data.fixedassets = data;					
					
					
					if ($scope.data.disposedassets.length>0)
					{
						for (var i=0; i < $scope.data.disposedassets; i++)
						{
							$scope.deleteProduct($scope.data.disposedassets);
						}
					}
					
					var disposedassets={};	
					
					for (var i = 0; i < $scope.data.fixedassets; i++) 
					{					
						disposedassets.location=$scope.data.fixedassets[i].location;
						disposedassets.department=$scope.data.fixedassets[i].department;
						disposedassets.assetDesc=$scope.data.fixedassets[i].assetDesc;
						disposedassets.assetCost=$scope.data.fixedassets[i].assetCost;
						
						var varPurchaseDate=new Date($scope.data.fixedassets[i].purchaseDate);
						var purchaseYear=varPurchaseDate.getFullYear();			
						var todaysdate=new Date().getFullYear();
						
						//Find the accumulated years
						var accumYears= todaysdate - purchaseYear;	
						
						//Find the depreciation rate
						var varDepreRate=($scope.data.fixedassets[i].assetCost - $scope.data.fixedassets[i].residAmount)/$scope.data.fixedassets[i].usefulYears;
						
						//Get the accumulated depreciation
						disposedassets.accumDepre= accumYears * varDepreRate;  
						
						varAccumDepre=$scope.getAccumDepre($scope.data.fixedassets[i].assetDesc);
						disposedassets.npv=$scope.data.fixedassets[i].assetCost - varAccumDepre;
						disposedassets.residAmount=$scope.data.fixedassets[i].residAmount;
						
						//document.write("I AM HERE");
						
					    document.write(disposedassets.npv);
					
						$scope.data.createDisposedassets(disposedassets);
						disposedassets=[];						
					}
					return $http.get(disposedassetsUrl);
				})
				.error(function (error) 
				{
					$scope.data.error = error;
				});			
        };	
    });
