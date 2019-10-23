(function(){
	'user strict';
	
	angular
		.module('myApp')
		.controller('DealController',DealController);
	
	DealController.$inject = ['$scope','$rootScope','$route','DealService'];
	
	function DealController($scope,$rootScope,$route,DealService){
		
		$scope.activetab = $route.current.activetab;
		if($scope.activetab != 'deal'){
			$scope.collapseVar = 0;
		}else{
			$scope.collapseVar = 1;
		}
		
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
		
	
        $scope.deals = {};
        $scope.pdfdeal = {};

		
		var deal=DealService.getAll();
			$scope.deals =deal;
			
		 $scope.invoice = function(deal){
	           $scope.pdfdeal=deal;
         }
        
        
        
        
       
	}
       
    
})();
