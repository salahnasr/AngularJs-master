"use strict";

myApp.factory('ContactService', function ($resource) {
    var myRessource = $resource('http://localhost\\:18080/airport-web/rest/reservation/mail/:Subject/:message/:to'
        , {Subject: '@Subject', message:'@message', to:'@to'}
        , { 
            query: { method: "GET", isArray: true }
        }
    );
    
    
    return myRessource;
    
});