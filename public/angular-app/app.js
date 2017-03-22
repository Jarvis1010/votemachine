angular.module('votingapp',['ngRoute','angular-jwt'])
    .config(config).run(run);
    
    
function config($httpProvider,$routeProvider){
   $httpProvider.interceptors.push('Authinterceptor');
   
    $routeProvider.when('/',{
        templateUrl:'angular-app/main/main.html',
        access:{
            restricted:false
        }
    })
    .when('/register',{
        templateUrl:'angular-app/register/register.html',
        access:{
            restricted:false
        },
        controller:RegisterController,
        controllerAs:'vm'
    })
    .when('/profile',{
        templateUrl:'angular-app/profile/profile.html',
        access:{
            restricted:true
        }
    })
    .otherwise({
        redirect:'/'
    });
     /*$routeProvider.when('/hotels',{
        templateUrl:'angular-app/hotel-list/hotels.html',
        controller:HotelsController,
        controllerAs:'vm'
    })
    .when('/hotels/:id',{
        templateUrl:'angular-app/hotel-display/hotel.html',
        controller:HotelController,
        controllerAs:'vm'
    })*/
}

function run($rootScope,$location,$window,Authfactory){
    
    $rootScope.$on('$routeChangeStart',function(event,nextRoute,currentRoute){
        
        if(nextRoute.access!==undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !Authfactory.isLoggedIn){
            event.preventDefault();
            $location.path('/');
        }
    });
}