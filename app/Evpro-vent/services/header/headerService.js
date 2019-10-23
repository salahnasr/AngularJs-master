"use strict";

myApp.factory('CurrencyService', function ($resource, $http) {

    var rates = {
    async: function() {
      var promise = $http.get('http://api.fixer.io/latest?base=USD').then(function (response) {
        return response.data.rates;
      });
      return promise;
    }
  };
  return rates;
    
    
});

myApp.factory('CurrencyParam', function () {

    var data = {
        name:'',
        val: '',
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


myApp.factory('LangagueParam', function () {

    var data = {
        val: '',
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


myApp.factory('openweather', function($http) {
	var runRequest = function(city) {
		return $http({
			method: 'JSONP',
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ city + '&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK&APPID=4bbaabb8ad657b203d08844d725c76ac'
		});
	};
	return {
		event: function(city) {
			return runRequest(city);
		}
	};
});
