angular.module("sportsStore")
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount) {

        var selectedLocation = null;
		
		$scope.selectedPage = 1;
		$scope.pageSize = productListPageCount;

        $scope.selectLocation = function (newLocation) {
            selectedLocation = newLocation;
			$scope.selectedPage = 1;
        }

		$scope.selectPage = function (newPage) {
			$scope.selectedPage = newPage;
		}
		
        $scope.locationFilterFn = function (fixedassets) {
            return selectedLocation == null ||
                fixedassets.location == selectedLocation;
        }
		
		$scope.getLocationClass = function (Location) {
			return selectedLocation == Location ? productListActiveClass : "";
		}
		
		$scope.getPageClass = function (page) {
			return $scope.selectedPage == page ? productListActiveClass : "";
		}
		$scope.getDepreRate = function (fixedassets) {
            return (fixedassets.assetCost - fixedassets.residAmount)/fixedassets.usefulYears;
        }
		$scope.getAccumYears = function (fixedassets) {
			var varPurchaseDate=new Date(fixedassets.purchaseDate);
			var purchaseYear=varPurchaseDate.getFullYear();
			
			var todaysdate=new Date().getFullYear();
            return todaysdate - purchaseYear;			
        }
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
        }
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
        }
		$scope.getDepreReport = function (fixedassets) {
				
        }
		$scope.getDisposedAssetsReport = function (fixedassets) {
				
        }
    });
