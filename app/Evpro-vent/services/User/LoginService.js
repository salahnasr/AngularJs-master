(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('LoginService',LoginService);
	
	LoginService.$inject = ['userService'];
	
	function LoginService (userService,Session,AUTH_EVENTS){
		var service = {};
		
		service.Login = Login;
		
		//service.GetType = GetType;
		
		return service;
		
		function  Login(email,password,callback){
			 var response;
			
			userService.GetUserByEmailAndPassword().get({email: email,password: password},function(client){
				 if(email !== null &&  client.password == password){
			
		
						response = {success:true, idClient : client.idClient, firstName : client.firstName, lastName : client.lastName,
                                   createTime : client.createTime, milesParcoured : client.milesParcoured, numberTrips : client.numberTrips};
                        console.log("success");
                     
																	 }
				 else{
					
					 response = {success:false, message: 'email or password is incorrect !!'};
                     console.log("echec");
				 }
				 callback(response);
			});
		}
		
	
		/*function GetType(user,typeCallback){
			var pathResponse;
			return UserService.GetUserByLoginAndPassword().save({},{id:user},function(type){
				if(type[0] === '1'){
					pathResponse = {path: '/hrDash', role: 'hrEmployee'};
				}else if(type[0] === '2'){
					pathResponse = {path: '/fanDash', role: 'fanEmployee'};
				}else if(type[0] === '3'){
					pathResponse = {path: '/inventDash',role: 'inventEmployee'};
				}else{
					pathResponse = {path: ''};
				}
				typeCallback(pathResponse);
			});
		}*/
		
		
		
	}
    
    	
})();	

    