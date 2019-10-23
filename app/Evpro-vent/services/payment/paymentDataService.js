(function(){
	'use strict';
	angular
	.module('myApp')
	.factory('DealDataService',DealDataService);
	DealDataService.$inject = ['$resource'];
	function DealDataService ($resource){
		var service = {};

		service.GetAllDeal = GetAllDeal;
      
	

		return service;

		function GetAllDeal(){
			return $resource("http://localhost\\:18080/airport-web/rest/Deal/getActive");
		}
       
	}
})();