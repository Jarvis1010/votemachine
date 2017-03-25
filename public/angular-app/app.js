angular.module('votingapp',['ngRoute','angular-jwt'])
    .config(config).run(run);
    
    
function config($httpProvider,$routeProvider){
   $httpProvider.interceptors.push('Authinterceptor');
   
    $routeProvider.when('/',{
        templateUrl:'angular-app/main/main.html',
        controller:MainController,
        controllerAs:"vm",
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
    .when('/new',{
        templateUrl:'angular-app/new/new-poll.html',
        controller:NewpollController,
        controllerAs:'vm',
        access:{
            restricted:true
        }
    })
    .when('/:creator/:title',{
        templateUrl:'angular-app/poll-display/poll.html',
        controller:PollController,
        controllerAs:'vm',
        access:{
            restricted:false
        }
    })
    .otherwise({
        redirect:'/'
    });
     
}

function run($rootScope,$location,$window,Authfactory){
    
    $rootScope.$on('$routeChangeStart',function(event,nextRoute,currentRoute){
        
        if(nextRoute.access!==undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !Authfactory.isLoggedIn){
            event.preventDefault();
            $location.path('/');
        }
    });
}