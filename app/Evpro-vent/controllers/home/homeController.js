'use strict';

myApp.controller("Home" ,function ($scope, $location, $route, $log, $http, CurrencyService, CurrencyParam, LangagueParam,SearchParam,LocationService, openweather, $timeout) {
    
     $scope.items1 = [1,2,3,4,5];
    $scope.items2 = [1,2,3,4,5,6,7,8,9,10];
    
    init($scope, SearchParam, LocationService);
    
    
    $('input.date-pick, .input-daterange, .date-pick-inline').datepicker({
        startDate: 'd',
        todayHighlight: true

    });
    $('input.date-pick, .input-daterange input[name="start"]').datepicker('setDate', 'today');
    $('.input-daterange input[name="end"]').datepicker('setDate', '+7d');
    $('input.time-pick').timepicker({
        minuteStep: 15,
        showInpunts: false
    })
    $('input.date-pick-years').datepicker({
        startView: 2
    });
    
    $('.form-group-select-plus').each(function() {
        var self = $(this),
            btnGroup = self.find('.btn-group').first(),
            select = self.find('select');
        btnGroup.children('label').last().click(function() {
            btnGroup.addClass('hidden');
            select.removeClass('hidden');
        });
    });
      
    
    
    


        openweather.event("paris").success(function(data, status)	{	
            $scope.paris = data.list[0];
        });
        openweather.event("budapest").success(function(data, status)	{	
            $scope.budapest = data.list[0];
        });
        openweather.event("las vegas").success(function(data, status)	{	
            $scope.lasVegas = data.list[0];
        });
    
    
    
    var proposition=[];
    var locationsCode=[];
    var locations =LocationService.query(function() {
      for(var i=0;i<locations.length;i++)
        {
            proposition[i]=locations[i].airportCode+" - "+locations[i].city+" - "+locations[i].airportName;
            locationsCode[i]=locations[i].airportCode;
        }
        //console.log(proposition);
    });
    
    
    
    
    var options = {
	   data: proposition,
        list: {
            maxNumberOfElements: 10,
            match: {
                enabled: true
		  }
        }
    };
    $("#from2").easyAutocomplete(options);
    $("#to2").easyAutocomplete(options);
    $("#from").easyAutocomplete(options);
    $("#to").easyAutocomplete(options);
    

  
    
    
    
    $scope.passengers_2="6";
    $scope.passengers_="6";

    

   
    $scope.searchFlights = function() {
            console.log("One Way");  
            var exit=0;
            var to2=$("#to2").val();
            if(to2==""){
                $scope.to2 =true;//show error
                exit=1;
            }
            else{
                $scope.to2 =false;//hide error
                if(locationsCode.indexOf(to2.split(" ",1)[0])==-1){
                    $scope.to2_code =true;//show error
                    exit=1;
                }
                else
                    $scope.to2_code=false;
            }
            
            var from2=$("#from2").val();
            if(from2==""){
                $scope.from2 =true;//show error
                exit=1;
            }
            else{
                $scope.from2 =false;//hide error
                if(locationsCode.indexOf(from2.split(" ",1)[0])==-1){
                    $scope.from2_code =true;//show error
                    exit=1;
                }
                else
                    $scope.from2_code=false;
            }
            
            var day = $("#dateDeparting2").datepicker('getDate').getDate();    
            var month = $("#dateDeparting2").datepicker('getDate').getMonth()+1;    
            var year =  $("#dateDeparting2").datepicker('getDate').getFullYear();  
            //var fullDate = year + "-" + month + "-" + day;
            var fullDate = day+"-"+month+"-"+year;
            var fullDateX = year + "-" + month + "-" + day;
            
            if(fullDate==="NaN-NaN-NaN")
            {
                $scope.departing2=true;
                exit=1;
            }
            else
                $scope.departing2=false;
           
            var passenger = $('input[name=passengers2]:checked', '#searchFlights').val();
            if(typeof passenger == 'undefined')
                passenger=1;
            var passengers_2 =$scope.passengers_2;

            
            var passengers=passenger;
            if(passenger=="5+")
                passengers=passengers_2;
            
   
            
            if(exit==1)
                return;
            var search= {from:from2, to:to2, departingDate:fullDate, passengers:passengers,
                         departingDateX:fullDateX}
            SearchParam.setData(search);
            //console.log(search);
            $location.path("/flightOneWay");
            
        
        
      };
    
    
    
    $scope.goLasVegas=function(){
        var search= {from:"TUN - Tunis - Tunis-Carthage International Airport", to:"TUN - Tunis - Tunis-Carthage International Airport", departingDate:"15-01-2016", passengers:1,
                         departingDateX:"2016-01-15"}
            SearchParam.setData(search);
            $location.path("/flightOneWay");
    }
    $scope.goBudapest=function(){
        var search= {from:"TUN - Tunis - Tunis-Carthage International Airport", to:"TUN - Tunis - Tunis-Carthage International Airport", departingDate:"15-01-2016", passengers:1,
                         departingDateX:"2016-01-15"}
            SearchParam.setData(search);
            $location.path("/flightOneWay");
    }
    $scope.goParis=function(){
        var search= {from:"TUN - Tunis - Tunis-Carthage International Airport", to:"ORY - Paris - Paris Orly Airport", departingDate:"15-01-2016", passengers:1,
                         departingDateX:"2016-01-15"}
            SearchParam.setData(search);
            $location.path("/flightOneWay");
    }
    
    
});




