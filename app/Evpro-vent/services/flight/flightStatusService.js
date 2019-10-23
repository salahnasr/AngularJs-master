"use strict";


myApp.factory('FlightStatusService', function ($resource) {
//http://localhost:18080/airport-web/rest/flight/searchOneWay2?departLocation=ENH&arrivalLocation=TUN&dateDepart=21-12-2015
    var myRessource = $resource('http://localhost\\:18080/airport-web/rest/flight/findByNumber'
        ,{
            number:''
         }
        , { 
            query: { method: "GET", isArray: true }
        }
    );
    
    
    return myRessource;
});



