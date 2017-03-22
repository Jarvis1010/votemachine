angular.module('votingapp').factory('Authfactory',Authfactory);

function Authfactory(){
    
    var auth={
      isLoggedIn:false  
    };
    
    return{
        auth:auth
    };
    
    
}