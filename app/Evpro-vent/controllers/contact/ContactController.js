'use strict';


myApp.controller("Contact" ,function ($scope,
                                    $route, ContactService) {

    $scope.mailShow=false;
    
    $scope.sendMail = function(mail){
        console.log("cc");
        
        ContactService.get({ Subject:mail.subject,message:mail.message, to:mail.to }, function() {
                $scope.mailShow=true;
          });
    }


});