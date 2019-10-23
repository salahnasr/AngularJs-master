(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('LoginController',LoginController);
	
	LoginController.$inject = ['LoginService','$scope','$location','AuthenticatedUser','$rootScope', 'profilService'];
	
	function LoginController(LoginService,$scope,$location,AuthenticatedUser,$rootScope, profilService){
		$scope.credentials = {
    				email: '',
					password: ''
				  };
		$scope.errorMsg = '';
		$scope.login = function(credentials){
			 LoginService.Login(credentials.email,credentials.password,function(response){
				if(response.success){
					$rootScope.AuthenticatedUser = {idClient : response.idClient, firstName : response.firstName, lastName : response.lastName                     ,createTime : response.createTime, milesParcoured : response.milesParcoured, numberTrips : response.numberTrips, c:true};
					console.log($rootScope.AuthenticatedUser);
                    
                    console.log("success");
					/*LoginService.GetType(response.userId,function(pathResponse){
						$rootScope.Role = pathResponse.role;*/
						$location.path("/profil");
						/*console.log('test',pathResponse.path);
						console.log('test',$rootScope.Role);
						
					})*/
					
				}else{
					$scope.errorMsg = response.message;
					console.log(response.message);
					
				$scope.credentials = {
    				email: '',
					password: ''
				  };
				}
			});
			
			
			
	};
		
        //var u=profilService.get({idClient: 1});
        
        $scope.register = function(user){
              profilService.save(user, function() {
                    $scope.ok=true;
              });
            
            
        }
        $scope.ok=false;
        $scope.ko=false;
        
		$scope.logout = function(){
			$rootScope.AuthenticatedUser = null;
			$location.path("/");
		};
		
		}
    
    
    })();