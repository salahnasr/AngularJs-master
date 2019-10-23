/* @flow */
'use strict';

var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.value('AuthenticatedUser',{})
        .config(config)
        .run(function($rootScope, $location) {
	    $rootScope.$on("$routeChangeStart", function(event, next, current) {

	      if ($rootScope.AuthenticatedUser== null) {

	        // no logged user, redirect to /login
	        if ( next.templateUrl === "partials/login.html" || next.templateUrl === "partials/flightStatus.html" ) {
	        }
	        else {
//	          $location.path("/");
	        }
	      }
	    });
	  });


config.$inject = ['$routeProvider'];

function config($routeProvider){
    $routeProvider
        .when('/event',{
            controller:'LoginController',
            templateUrl:'../../partials/event.html'

        })
        .when('/contact',{
            controller:'ProfilController',
            templateUrl:'../app/partials/contact.html',
            resolve:{
                "check":function($location,$rootScope){

                    $location.path('/');
                    $rootScope.AuthenticatedUser = null;

                }
            }
        })

}




