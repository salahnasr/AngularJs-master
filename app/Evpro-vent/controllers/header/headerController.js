'use strict';

myApp.controller("Header" ,function ($scope, $location, $route, $log, $http, CurrencyService, CurrencyParam, LangagueParam, $rootScope) {
    
    $scope.$route = $route;
    
    $scope.currency="USD $";
    var currency=getCookie("currency");
    var currencyValc = getCookie("currencyVal");
    if (currency != "" || currencyValc!="") {
        $scope.currency=currency;
        $scope.currencyVal=currencyValc;
    } else {
       currency = "USD $";
       setCookie("currency", currency, 30);
       setCookie("currencyVal", 1, 30);
       $scope.currency=currency;
        $scope.currencyVal=1;
       
    }
    
    $scope.langague="en";
    $scope.langagueImage="uk.png";
    var langague=getCookie("langague");
    var langagueImage=getCookie("langagueImage");
    if (langague != "" && langagueImage!="") {
        $scope.langague=langague;
        $scope.langagueImage=langagueImage;
        //console.log($scope.langague+"  "+$scope.langagueImage);
    } else {
        langague = "en";
        langagueImage="uk.png";
        setCookie("langague", langague, 30);
        setCookie("langagueImage", langagueImage, 30);
        $scope.langague=langague;   
        $scope.langagueImage=langagueImage;
    }
    

    var param={name:$scope.currency, val:$scope.currencyVal};
    CurrencyParam.setData(param);
    
    param={val:$scope.langague}
    LangagueParam.setData(param);
    
    var rates=CurrencyService.async().then(function(d) {
        rates = d;
    }); 
    
    
    
    $scope.changeCurrency = function(newC){
        var toValue;
        var c = newC.split(' ')[0];
        var value=1;
        if(c==="USD")
            value=1;
        else{
            for(var key in rates) {
                if(key===c){
                   var value = rates[key]; 
                    console.log(value);
               }
            }
        }
        
        setCookie("currency", newC, 30);
        setCookie("currencyVal", value, 30);
        $scope.currency=newC;
        $scope.currencyVal=value;
        var param={name:$scope.currency, val:$scope.currencyVal};
        CurrencyParam.setData(param);
        
        
    }
    
    $scope.changeLangague = function(newL, newLI){
        $scope.langague=newL;
        $scope.langagueImage=newLI+".png";
        setCookie("langague", newL, 30);
        setCookie("langagueImage", $scope.langagueImage, 30);
        param={val:$scope.langague}
        LangagueParam.setData(param);
    }

    $scope.isConnected=false;
    
    if ($rootScope.AuthenticatedUser== null) {
           $scope.isConnected=false;
    }
    else{$scope.isConnected=true;}
    //console.log($scope.isConnected);
        
$scope.logout = function(){
			$rootScope.AuthenticatedUser = null;
			$location.path("/");
		};
    
    
});


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

