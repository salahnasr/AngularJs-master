'use strict';

myApp.controller("InformationProfil" ,function ($scope, $validator, profilService,$rootScope) {
    
    
   
    
    $scope.client=profilService.get({idClient: $rootScope.AuthenticatedUser.idClient});
    
    $scope.submit=function(){
            console.log($scope.client);
            $scope.client.$update(function(){
                console.log($scope.client);
//               
            });
    };

   
});

