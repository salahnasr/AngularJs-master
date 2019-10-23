"use strict";

myApp.factory('LocationService', function ($resource) {
    var myRessource = $resource('http://localhost\\:18080/airport-web/rest/locations'
        , {}
        , { 
            query: { method: "GET", isArray: true }
        }
    );
    
    
    return myRessource;
    
});

myApp.factory('FlightService', function ($resource) {
//http://localhost:18080/airport-web/rest/flight/searchOneWay2?departLocation=ENH&arrivalLocation=TUN&dateDepart=21-12-2015
    var myRessource = $resource('http://localhost\\:18080/airport-web/rest/flight/searchOneWay2'
        ,{
            departLocation:'', arrivalLocation:'',
            dateDepart:''
         }
        , { 
            query: { method: "GET", isArray: true }
        }
    );
    
    
    return myRessource;
});

myApp.factory('SearchParam', function () {

    var data = {
        from:'',
        to: '',
        departingDate:'',
        returningDate:'',
        passengers:'',
        departingDateX:'',
        returningDateX:''
    };
    
    var setData = function(newData) {
      data=newData;
    };
    
    var getData = function(){
      return data;
  };

    return {
        setData: setData,
        getData: getData
    };
});


