'use strict';

myApp.factory('profilService',function($resource){
    return $resource('http://localhost\\:18080/airport-web/rest/client/:idClient', { idClient: '@idClient' }, {
        update:{
            method: 'PUT'
        }
    });
});

myApp.factory('historyService',function($resource){
    return $resource('http://localhost\\:18080/airport-web/rest/reservation/:idClient', { idClient: '@idClient' }, {
        update:{
            method: 'PUT'
        }
    });
});

/*myApp.factory('addUserService',function($resource){
    return $resource('http://localhost\\:18080/airport-web/rest/client', { }, {
        update:{
            method: 'PUT'
        }
    });
});*/




/*
myApp.factory('historyService',function($resource){
    return $resource('http://localhost\\:18080/airport-web/rest/reservation/findResByClientId/:idClient', { idClient: '@idClient' }, {
        update:{
            method: 'PUT'
        }
    });
});


myApp.factory('cancelService',function($resource){
    return $resource('http://localhost\\:18080/airport-web/rest/reservation/cancel', { }, {
        update:{
            method: 'PUT'
        }
    });
});

*/


/*(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('profilService',profilService);
	
	profilService.$inject = ['$resource']
	function profilService($resource){
		var service = {};
		
		service.GetUserById = GetUserById;
		service.updateUser=updateUser;
		return service;
		
		function GetUserById(){
			return $resource('http://localhost\\:18080/airport-web/rest/client/:idClient')
        }
        
        function updateUser(){
            return $resource('http://localhost\\:18080/airport-web/rest/client/:idClient', { idClient: '@idClient' }, {
            update: {
              method: 'PUT'
            }
        })
        }
        
        
		

	}
    
    })();*/
    
  