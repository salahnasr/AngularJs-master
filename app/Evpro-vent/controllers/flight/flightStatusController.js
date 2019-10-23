'use strict';

myApp.controller("FlightStatus" ,function ($scope, $location, $route,FlightStatusService, $timeout, uiGmapGoogleMapApi) {
    
    $scope.showDiv=false;
    
    $scope.flight={};
    
    
    /*$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    uiGmapGoogleMapApi.then(function(maps) {

    });
    */

    $scope.chechStatus = function(flightNumber){
        var flight={};
        flight=FlightStatusService.get({
            number:flightNumber
        }, function(){
            

            
            if(isEmpty(flight)){
            }
            else{
                $scope.flight=flight;
                $scope.showDiv=true;
                $scope.max=20;
                $scope.progress=0;
                
                var v=Math.ceil(($scope.flight.milesParcoured*100)/$scope.flight.flightMiles);
                
                $timeout(function(){
                $scope.progress = v;
              }, 800);
                
                
                $scope.map = {center: {latitude: flight.departLocation.lat, longitude: flight.departLocation.lan }, zoom: 4, bounds: {}};
        $scope.polylines = [];
        uiGmapGoogleMapApi.then(function(){
          $scope.polylines = [
            {
                id: 1,
                path: [
                    {
                        latitude: flight.arrivalLocation.lat,
                        longitude: flight.arrivalLocation.lan
                    },
                    {
                        latitude: flight.departLocation.lat,
                        longitude: flight.departLocation.lan
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: false,
                geodesic: true,
                visible: true,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ];
        });
    
                
            }
            
        });        

    }
    
});


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}