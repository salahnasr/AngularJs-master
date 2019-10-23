(function(){
	'use strict';
	angular
	.module('myApp')
	.factory('DealDataService',DealDataService);
	DealDataService.$inject = ['$resource'];
	function DealDataService ($resource){
		var service = {};

		service.GetAllpayment = GetAllDeal;
      
	

		return service;

		function Addpayment(){
			return $resource("http://localhost:18080/evpro-web/rest/participant/add");
		}
       
	}
})();