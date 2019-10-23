'use strict';

myApp.controller("Profil" ,function ($rootScope,$scope, $validator) {
    
    $scope.firstName = $rootScope.AuthenticatedUser.lastName + " " +$rootScope.AuthenticatedUser.firstName;
    
     $scope.createTime = $rootScope.AuthenticatedUser.createTime;
     $scope.milesParcoured = $rootScope.AuthenticatedUser.milesParcoured;
     $scope.numberTrips = $rootScope.AuthenticatedUser.numberTrips;
    
    console.log($rootScope.AuthenticatedUser.createTime);
});

