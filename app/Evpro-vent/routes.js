
'use strict';


myApp.config(function($routeProvider) {

    $routeProvider.when(
    	'/event',
    	{
    		templateUrl: '../partials/event.html',
    		controller: 'DealController',
			caseInsensitiveMatch:true
    	});
    
    
    $routeProvider.when(
    	'/home', 
    	{
    		templateUrl: '../partials/body.html',
    		controller: 'Home',
            caseInsensitiveMatch:true
    	});
    
    $routeProvider.when(
    	'/event-sidebar-left',
    	{
    		templateUrl: '../partials/event-sidebar-left.html',
    		controller: 'SearchFlights',
			caseInsensitiveMatch:true
    	});
    $routeProvider.when(
    	'/event-sidebar-right',
    	{
    		templateUrl: '../partials/event-sidebar-right.html',
    		controller: 'FlightOneWay',
            caseInsensitiveMatch:true
    	});
    $routeProvider.when(
    	'/event-detail',
    	{
    		templateUrl: '../partials/event-detail.html',
    		controller: 'FlightStatus',
            caseInsensitiveMatch:true
    	});
        $routeProvider.when(
    	'/event-tv',
    	{
    		templateUrl: '../partials/event-tv.html',
    		controller: 'Profil',
            caseInsensitiveMatch:true

        });
    $routeProvider.when(
    	'/event-blog',
    	{
    		templateUrl: '../partials/event-blog.html',
    		controller: 'InformationProfil',
            caseInsensitiveMatch:true

        });
     $routeProvider.when(
    	'/event-single-blog',
    	{
    		templateUrl: '../partials/event-single-blog.html',
    		controller: 'LoginController',
            caseInsensitiveMatch:true

        });
    $routeProvider.when(
    	'/gallery',
    	{
    		templateUrl: '../partials/gallery.html',
    		controller: 'History',
            caseInsensitiveMatch:true

        });
    $routeProvider.when(
    	'/contact', 
    	{
    		templateUrl: '../partials/contact.html',
    		controller: 'Contact',
            caseInsensitiveMatch:true


        });
	$routeProvider.when(
		'/payment',
		{
			templateUrl: '../partials/payment.html',
			controller: 'payment',
			caseInsensitiveMatch:true


		});

	$routeProvider.when(
		'/login',
		{
			templateUrl: '../partials/login.html',
			controller: 'login',
			caseInsensitiveMatch:true


		});

	$routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
});

