'use strict';


myApp.controller("SearchFlights" ,function ($scope, $validator, LocationService, SearchParam, $location,
                                            $route, $routeParams, $log, LangagueParam, $translate,
                                            
                                            DealService) {


    
    
    $scope.$watch(function(){return LangagueParam.getData().val;}, function (newValue) {
            
            //console.log(newValue);
            $translate.use(newValue);
        
        }, true);
    
    
    
    
    
    
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
        
        
        
        if($('#flight-search-1').is(':visible')) { //Round Trip
            console.log("Round Trip");
            
            
            var exit=0;
            var to=$("#to").val();
            if(to==""){
                $scope.to =true;//show error
                exit=1;
            }
            else{
                $scope.to =false;//hide error
                if(locationsCode.indexOf(to.split(" ",1)[0])==-1){
                    $scope.to_code =true;//show error
                    exit=1;
                }
                else
                    $scope.to_code=false;
            }
            
            var from=$("#from").val();
            if(from==""){
                $scope.from =true;//show error
                exit=1;
            }
            else{
                $scope.from =false;//hide error
                if(locationsCode.indexOf(from.split(" ",1)[0])==-1){
                    $scope.from_code =true;//show error
                    exit=1;
                }
                else
                    $scope.from_code=false;
            }
            
            var day = $("#dateDeparting").datepicker('getDate').getDate();    
            var month = $("#dateDeparting").datepicker('getDate').getMonth()+1;    
            var year =  $("#dateDeparting").datepicker('getDate').getFullYear();  
            //var fullDate = year + "-" + month + "-" + day;
            var fullDate = day+"-"+month+"-"+year;
            var fullDateX = year + "-" + month + "-" + day;
            if(fullDate==="NaN-NaN-NaN")
            {
                $scope.departing=true;
                exit=1;
            }
            else
                $scope.departing=false;
            
           
            day = $("#dateReturning").datepicker('getDate').getDate();    
            month = $("#dateReturning").datepicker('getDate').getMonth()+1;    
            year =  $("#dateReturning").datepicker('getDate').getFullYear();  
            //var fullDate2 = year + "-" + month + "-" + day;
            var fullDate2 = day+"-"+month+"-"+year;
            var fullDate2X = year + "-" + month + "-" + day;
            if(fullDate2==="NaN-NaN-NaN")
            {
                $scope.returning=true;
                exit=1;
            }
            else
                $scope.returning=false;
            
            var passenger = $('input[name=passengers]:checked', '#searchFlights').val();
            if(typeof passenger == 'undefined')
                passenger=1;
            var passengers_ =$scope.passengers_;

            
            var passengers=passenger;
            if(passenger=="5+")
                passengers=passengers_;
            
   
            
            if(exit==1)
                return;
            var search= {from:from, to:to, departingDate:fullDate, returningDate:fullDate2, passengers:passengers, departingDateX:fullDateX, returningDateX:fullDate2X}
            //SearchParam.setData(search);
            console.log(search);

            
        }
        else{ //One Way
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
            
            
            
            
        }
        
      };

    
    
    var deal=DealService.getAll();
    $scope.deals =deal;
    console.log($scope.deals);
    
    
});

