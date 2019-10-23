'use strict';

myApp.controller("chart" ,function ($scope, $validator,$rootScope, historyService) {
    
    
       $scope.firstName = $rootScope.AuthenticatedUser.lastName + " " +$rootScope.AuthenticatedUser.firstName;
    
    var airlines=[];
    var airlinesVal=[];
    
    $scope.history=historyService.query({idClient: $rootScope.AuthenticatedUser.idClient}, function(){
             
            var ind=-1;
        for(var i=0;i<$scope.history.length;i++){
            ind=airlines.indexOf($scope.history[i].flight.airlineCompany.name);
            if(ind==-1){
                airlines.push($scope.history[i].flight.airlineCompany.name);
                airlinesVal.push(1);
            }else{
                airlinesVal[ind]=airlinesVal[ind]+1;
            }

        }
            
        });
        
    
    $scope.labels = airlines;
  $scope.data = airlinesVal;

   
});
