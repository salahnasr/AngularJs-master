(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('DealService',DealService);
	
	DealService.$inject = ["DealDataService"];
	
	function DealService ( DealDataService){
		var service = {};
		
		service.getAll = getAll;
		
		
		return service;
		
		
		
        
        	function getAll(){
			 var response;
			
			return DealDataService.GetAllDeal().query()
}
        
}
    
})();