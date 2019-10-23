'use strict';

myApp.controller("FlightOneWay" ,function ($scope, SearchParam, LocationService, $location, FlightService, $route, CurrencyParam) {
    
    var initialFlights=[];    
    var currencyObject = CurrencyParam.getData();
    if(currencyObject.name==null || currencyObject.name===""){
        currencyObject.name="USD $";
        currencyObject.val=1;
    }
    $scope.currencyCode=currencyObject.name.split(' ')[1];
    
    var searchParam= SearchParam.getData();
    if(searchParam.from==="" || searchParam.to==="" || searchParam.departingDate===""  || searchParam.passengers===""  ){
           $location.path("/searchFlights");
    }
    $scope.searchParam=searchParam;
    

    
    
    var px=2;
        
        
    $scope.lowest=0;
    $scope.highest=3000;
    
    init($scope, SearchParam, LocationService);



    var proposition=[];
    var locationsCode=[];
    var locations =LocationService.query(function() {
      for(var i=0;i<locations.length;i++)
        {
            proposition[i]=locations[i].airportCode+" - "+locations[i].city+" - "+locations[i].airportName;
            locationsCode[i]=locations[i].airportCode;
        }
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
    $("#from_current").easyAutocomplete(options);
    $("#to_current").easyAutocomplete(options);
    
    $("#from2").easyAutocomplete(options);
    $("#to2").easyAutocomplete(options);
    $("#from").easyAutocomplete(options);
    $("#to").easyAutocomplete(options);
    
    $scope.passengers_2="6";
    $scope.passengers_="6";
    $scope.passengers_current="6";
    $scope.passengers__current="6";
    $scope.to2 =false; //hide error
    
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
            var fullDate = day+"-"+month+"-"+year;
            
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
            var fullDate2 = day+"-"+month+"-"+year;
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
            var search= {from:from, to:to, departingDate:fullDate, returningDate:fullDate2, passengers:passengers}
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
            var search= {from:from2, to:to2, departingDate:fullDate, passengers:passengers, departingDateX:fullDateX}
            SearchParam.setData(search);
            $('.popup-text').magnificPopup('close');
            //console.log(search);
            $route.reload();
        }
        
    };

    $scope.updateSearch = function(){
        var exit=0;
        var to=$("#to_current").val();
        if(to==""){
            $scope.to_current =true;//show error
            exit=1;
        }
        else{
            $scope.to_current =false;//hide error
            if(locationsCode.indexOf(to.split(" ",1)[0])==-1){
                $scope.to_current_code =true;//show error
                exit=1;
            }
            else
                $scope.to_current_code=false;
        }

        var from=$("#from_current").val();
        if(from==""){
            $scope.from_current =true;//show error
            exit=1;
        }
        else{
            $scope.from_current =false;//hide error
            if(locationsCode.indexOf(from.split(" ",1)[0])==-1){
                $scope.from_current_code =true;//show error
                exit=1;
            }
            else
                $scope.from_current_code=false;
        }

        var day = $("#dateDeparting_current").datepicker('getDate').getDate();    
        var month = $("#dateDeparting_current").datepicker('getDate').getMonth()+1;    
        var year =  $("#dateDeparting_current").datepicker('getDate').getFullYear();  
        var fullDate = day+"-"+month+"-"+year;
        var fullDateX = year + "-" + month + "-" + day;
        if(fullDate==="NaN-NaN-NaN")
        {
            $scope.departing_current=true;
            exit=1;
        }
        else
            $scope.departing_current=false;

        var passenger = $('input[name=passengers_current]:checked', '#updateSearch').val();
        if(typeof passenger == 'undefined')
            passenger=1;
        var passengers_2 =$scope.passengers__current;


        var passengers=passenger;
        if(passenger=="5+")
            passengers=passengers_2;



        if(exit==1)
            return;
        var search= {from:from, to:to, departingDate:fullDate, passengers:passengers, departingDateX:fullDateX}
        SearchParam.setData(search);
        $route.reload();
        console.log(search);
    };
    
    
    
   
    $("#to_current").val(searchParam.to);
    $("#from_current").val(searchParam.from);
    $("#dateDeparting_current").datepicker('update', new Date(searchParam.departingDateX));
    

/*    var flights = FlightService.query({
            departLocation:searchParam.from.split(" ",1)[0],
            arrivalLocation:searchParam.to.split(" ",1)[0],
            dateDepart:searchParam.departingDate
        }, function(){
//        console.log(flights);
        $scope.flights=flights;
    });*/
    var flightsP=FlightService.query({
            departLocation:searchParam.from.split(" ",1)[0],
            arrivalLocation:searchParam.to.split(" ",1)[0],
            dateDepart:searchParam.departingDate
        }, function(){
    });
    $scope.totalFlights=0;
    var flights = FlightService.query({
            departLocation:searchParam.from.split(" ",1)[0],//'ENH'
            arrivalLocation:searchParam.to.split(" ",1)[0],//'TUN'
            dateDepart:searchParam.departingDate//'28-12-2015'
        }, function(){
         $scope.totalFlights=flights.length;
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var  tmp;
        var airlinesCompanyNames = new Set();
        var airlinesCompanyId = new Set();
        var debut=0;
        var flights2=[];
        for(var i=0;i<flights.length;i++)
        {
            flights[i].price=Math.ceil(currencyObject.val*flights[i].price);
            if(flights[i].numberStops==0)
                flights[i].displayNumberStops="non-stop";
            else
                flights[i].displayNumberStops=flights[i].numberStops+" stops";
            tmp = flights[i].price;
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
            
            airlinesCompanyNames.add(flights[i].airlineCompany.name);
            airlinesCompanyId.add(flights[i].airlineCompany.idAirlineCompany);
            
            if(airlinesCompanyId.size>debut){
                flights2.push(flights[i]);
                debut++;
            }
            
            //
        }
        var TairlinesCompanyId=Array.from(airlinesCompanyId);
        var TairlinesCompanyNames=Array.from(airlinesCompanyNames);

        $scope.airlinesCompanyNames=TairlinesCompanyNames;
        $scope.airlinesCompanyId=TairlinesCompanyId;
        
        $scope.airlineCompanyFilter=TairlinesCompanyId;
        
        $scope.lowest=lowest;
        $scope.highest=highest;
        initialFlights=flights;
        $scope.flights=flights;
        $scope.flights2=flights2;
        
        
    });
    
    
    var locations =LocationService.query(function() {
      for(var i=0;i<locations.length;i++)
        {
            proposition[i]=locations[i].airportCode+" - "+locations[i].city+" - "+locations[i].airportName;
            locationsCode[i]=locations[i].airportCode;
        }
    });
    
    
    
   

    //console.log(SearchParam.getData());
    
    $scope.fligtDetails=function(){
        
        $('.booking-item-container').children('.booking-item').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().removeClass('active');
        } else {
            $(this).addClass('active');
            $(this).parent().addClass('active');
            $(this).delay(1500).queue(function() {
                $(this).addClass('viewed')
                });
            }
        });
    };
    
    $scope.orderBy="price";
    $scope.orderByText="Price (low to high)";
    $scope.stop=[];
    $scope.airlineCompanyFilter=[];
//    $scope.airlineCompanyFilter.push(1);
//    $scope.airlineCompanyFilter.push(2);
    
    
    
    
    $scope.stop0=true;
    $scope.stop1=true;
    $scope.stop2=true;
    $scope.stop3=true;
    $scope.$watch('stop0', function() {
       if($scope.stop0){
           $scope.stop.push(0);
       }else{
           $scope.stop.splice($scope.stop.indexOf(0), 1);
       }
    });
    $scope.$watch('stop1', function() {
       if($scope.stop1){
           $scope.stop.push(1);
       }else{
           $scope.stop.splice($scope.stop.indexOf(1), 1);
       }
    });
    $scope.$watch('stop2', function() {
       if($scope.stop2){
           $scope.stop.push(2);
       }else{
           $scope.stop.splice($scope.stop.indexOf(2), 1);
       }
    });
    $scope.$watch('stop3', function() {
       if($scope.stop3){
           $scope.stop.push(3); $scope.stop.push(4); $scope.stop.push(5); $scope.stop.push(6);
       }else{
           $scope.stop.splice($scope.stop.indexOf(3), 1); $scope.stop.splice($scope.stop.indexOf(4), 1);
           $scope.stop.splice($scope.stop.indexOf(5), 1); $scope.stop.splice($scope.stop.indexOf(6), 1);
       }
    });
    
    $scope.changerOrderBy=function(orderBy, orderByText){
        $scope.orderBy=orderBy;
    $scope.orderByText=orderByText;
    };
    
    $scope.rangeFinishCallback = function(sliderObj){
        var currentFlights=initialFlights;
        var FilteredFlights=[];
        for(var i=0;i<currentFlights.length;i++)
        {
            if(currentFlights[i].price>=sliderObj.from && currentFlights[i].price<=sliderObj.to)
            {
                //console.log(currentFlights[i].price);
                FilteredFlights.push(currentFlights[i]);
            }
        }
        $scope.flights=FilteredFlights;
        $scope.$apply();
    }
    
    $scope.xx=true;
    
    
    $scope.changeA = function(idA, status){
        //console.log(idA, status);
        var tmp=initialFlights;
        var newFlights = [];
        if(status==true){
            newFlights=$scope.flights;
        for(var i=0;i<tmp.length;i++){
            if(tmp[i].airlineCompany.idAirlineCompany==idA ){
                newFlights.push(tmp[i]);
            }
        }
        }
        else{
         for(var i=0;i<tmp.length;i++){
            if(tmp[i].airlineCompany.idAirlineCompany!=idA ){
                newFlights.push(tmp[i]);
                }
            }   
        }
        $scope.flights=newFlights;
    }

    
    
    $scope.$watch(function(){return CurrencyParam.getData().val;}, function (newValue) {
        $scope.currencyCode=CurrencyParam.getData().name.split(' ')[1];
        
        for(var i=0;i<flightsP.length;i++)
        {
            $scope.flights[i].price=Math.ceil(CurrencyParam.getData().val*flightsP[i].price);
            //console.log(flightsP[i].price);
        }
        $scope.updateSearch();
//        $scope.flights=flights;
    }, true);

    
    
    
});

function init($scope, SearchParam, LocationService){
    // Lighbox text
    $('.popup-text').magnificPopup({
        removalDelay: 500,
        closeBtnInside: true,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true
    });

    
    
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
    
    $('.nav-drop').dropit();
    
    

    
}

