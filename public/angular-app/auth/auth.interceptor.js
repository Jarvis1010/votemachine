angular.module('votingapp').factory('Authinterceptor',Authinterceptor);

function Authinterceptor($window,Authfactory,$q,$location){
    
    return{
        request:request,
        response:response,
        responseError:responseError
    };
    
    function request(config){
        config.headers= config.headers||{};
        
        if($window.sessionStorage.token){
            config.headers.Authorization="Bearer "+ $window.sessionStorage.token;
           
        }
        return config;
    }
    
    function response(response){
        if(response.status==200&&$window.sessionStorage.token&&!Authfactory.isLoggedIn){
            Authfactory.isLoggedIn=true;
        }
        if(response.status==401){
            Authfactory.isLoggedIn=false;
        }
        return response||$q.when(response);
    }
    
    function responseError(rejection){
        if(rejection.status===401||rejection.status===403){
            delete $window.sessionStorage.token;
            Authfactory.isLoggedIn=false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}