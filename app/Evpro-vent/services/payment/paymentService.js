(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('paymentService',paymentService);

    paymentService.$inject = ["paymentDataService"];
	
	function paymentService ( paymentDataService){
		var service = {};
		
		service.getAll = getAll;
		
		
		return service;
		
		
		
        
        	function getAll(){
			 var response;
			
			return paymentDataService.GetAllpayment().query()
}
        
}
    
})();