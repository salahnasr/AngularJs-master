'use strict';

myApp.controller("History" ,function ($scope,historyService, $validator,$rootScope) {
    
        var d=new Date().getTime();
        
        $scope.s=[];
    
       $scope.firstName = $rootScope.AuthenticatedUser.lastName + " " +$rootScope.AuthenticatedUser.firstName;
    
        $scope.history=historyService.query({idClient: $rootScope.AuthenticatedUser.idClient}, function(){
             
            console.log(d);
            console.log($scope.history[0].flight.departDate);
            
            for(var i=0;i<$scope.history.length;i++){
            if($scope.history[i].flight.departDate>d && $scope.history[i].status!="cancled"){
                $scope.s.push(true);
            }
            else{
                $scope.s.push(false);
            }

            //console.log($scope.history);
            //console.log(d);
        }
            
        });
    
        $scope.cancel= function(h){
            //h.status="canceled";
  //          console.log(h);
            //h.cancelService.$update();
            
            $scope.history[h].$update(function(){
//                console.log("ok");
               $scope.history[h].status="cancled";
                $scope.s[h]=false;
                
            });
            
        };
        
    
        
        
    
//    console.log($scope.history.length);
    
    
   
});

