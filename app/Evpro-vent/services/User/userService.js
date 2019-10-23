(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('userService',userService);
	
	userService.$inject = ['$resource']
	function userService($resource){
		var service = {};
		
		service.GetUserByEmailAndPassword = GetUserByEmailAndPassword;
        
		return service;
		
		function GetUserByEmailAndPassword(){
			return $resource('http://localhost\\:18080/airport-web/rest/client/findClient/:email/:password');
		}
        
		

	}
    
    })();
    